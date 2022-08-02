const Booking = require("../models/booking");
const Room = require("../models/room");
const User = require("../models/user");

const bookingDates = async (req, res, next) => {
  if (!req.body) return res.json({ errorMessage: "No date provided" });
  const userId = req.params.user_id;
  const bookingDate = req.body.bookingDate;
  const checkInDate = req.body.checkInDate;
  const checkOutDate = req.body.checkOutDate;

  const response = await Booking.createBooking(
    userId,
    checkInDate,
    checkOutDate,
    bookingDate
  );
  if (response.rows[0]) {
    return res.status(200).json({ bookingId: response.rows[0].booking_id });
  }
};

const numberOfDays = (stringifiedDateObject) => {
  const day = 1000 * 60 * 60 * 24;
  const date = JSON.parse(stringifiedDateObject).date;
  const numOfDays = (new Date(date) - new Date(Date.now())) / day;
  return Math.floor(numOfDays);
};

const currentBookingData = (bookingsArray, currentBookingId) => {
  const bookingData = bookingsArray.find((booking) => {
    return booking.booking_id === parseInt(currentBookingId);
  });
  return bookingData;
};

const sortRoomIds = (bookingsArray, myCheckInDays, myCheckOutDays) => {
  let bookedRoomId = [];
  bookingsArray.map((booking) => {
    const isCheckInDateWithinCurrentBookingDates =
      myCheckInDays >= numberOfDays(booking.check_in_date) &&
      numberOfDays(booking.check_in_date) < myCheckOutDays &&
      booking.room_id !== null;

    if (isCheckInDateWithinCurrentBookingDates) {
      bookedRoomId.push(booking.room_id);
    }
  });
  console.log(bookedRoomId);
  return bookedRoomId;
};

const sortRoomsSendResponse = (roomsArray, sortedRoomIdArray, res) => {
  // TODO: perfect this algorithm
  let room = [];
  roomsArray.forEach(
    ({ room_id, room_description, no_of_beds, price, image_url }) => {
      const roomObject = {
        // TODO: add column room_name to room table
        room_id: room_id,
        room_description: room_description,
        no_of_beds: no_of_beds,
        price: price,
        image_url: image_url,
      };
      if (!sortedRoomIdArray[0]) {
        room.push(roomObject);
      } else {
        // TODO: putting this code in its own function and perfect
        sortedRoomIdArray.map((roomId, index) => {
          let previousIndexRoomId;
          if (index === 0) {
            previousIndexRoomId = null;
            console.log("previous room array: " + previousIndexRoomId);
          } else {
            previousIndexRoomId = sortedRoomIdArray[index - 1];
            console.log("previous room array: " + previousIndexRoomId);
          }
          if (roomId !== room_id && room_id !== previousIndexRoomId) {
            room.push(roomObject);
          }
        });
      }
    }
  );
  return res.status(200).json(room);
};

const getUnbookedRooms = async (req, res, next) => {
  const currentBookingId = req.params.booking_id;
  if (!currentBookingId) {
    return res.json({ errorMessage: "No booking id provided" });
  }
  const bookings = await Booking.getAllBookings();
  const rooms = await Room.getAllRooms();

  // TODO: perfect this algorithm
  if (!rooms.rows[0]) return res.json({ errorMessage: "No rooms available" });

  // const myBookingData = currentBookingData(bookings.rows, currentBookingId);
  // const myCheckInDaysFromNow = numberOfDays(myBookingData.check_in_date);
  // const myCheckOutDaysFromNow = numberOfDays(myBookingData.check_out_date);

  // const bookedRoomIdsArray = sortRoomIds(
  //   bookings.rows,
  //   myCheckInDaysFromNow,
  //   myCheckOutDaysFromNow
  // );

  return res.status(200).json(rooms.rows); // TODO: to be placed in the right place

  sortRoomsSendResponse(rooms.rows, bookedRoomIdsArray, res);
};

const bookRoom = async (req, res, next) => {
  const bookingId = req.params.booking_id;
  const roomId = req.body.roomId;
  const numberOfGuests = req.body.numberOfGuests;
  if (!bookingId || !roomId) {
    return res.json({ errorMessage: "No booking id or no room id" });
  }
  await Booking.updateBookingWithRoom(bookingId, roomId, numberOfGuests);
  res.status(200).json({ status: "success" });
};

// const matchBookingToRoomSendResponse = (bookingsArray, res) => {
//   const bookingData = [];
//   bookingsArray.map(async (booking, index) => {
//     if (booking.room_id !== null) {
//       const room = await Room.getRoomByRoomId(booking.room_id);
//       bookingData.push({
//         booking_id: booking.booking_id,
//         check_in_date: booking.check_in_date,
//         check_out_date: booking.check_out_date,
//         booking_date: booking.booking_date,
//         room_id: booking.room_id,
//         room_id: booking.room_id,
//         room_name: room.rows[0].room_name,
//         price: room.rows[0].price,
//         no_of_beds: room.rows[0].no_of_beds,
//         has_paid: booking.has_paid,
//         is_cancelled: booking.is_cancelled,
//       });
//     }
//     if (bookingsArray.length === index + 1) {
//       return res.status(200).json(bookingData);
//     }
//   });
// };

const getMyBookings = async (req, res, next) => {
  const userId = req.params.user_id;
  if (!userId) {
    return res.json({ errorMessage: "No user id, refresh to continue" });
  }
  const booking = await Booking.getBookingByUserId(userId);
  if (!booking.rows[0]) {
    return res.json({ errorMessage: "You have no any booking yet" });
  }
  res.status(200).json(booking.rows);
};

const getAllBookings = async (req, res, next) => {
  const bookings = await Booking.getAllBookingRoomUserData();
  if (!bookings.rows[0]) {
    return res.json({ errorMessage: "No bookings available" });
  }
  res.status(200).json(bookings.rows);
};

module.exports = {
  bookingDates,
  getUnbookedRooms,
  bookRoom,
  getMyBookings,
  getAllBookings,
};
