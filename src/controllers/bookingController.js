const Booking = require("../models/booking");
const Room = require("../models/room");

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

const getUnbookedRooms = async (req, res, next) => {
  const currentBookingId = req.params.booking_id;
  if (!currentBookingId) {
    return res.json({ errorMessage: "No booking id provided" });
  }
  // select all bookings
  const bookings = await Booking.getAllBookings();
  console.log(bookings.rows);
  // filter out the current booking details(checkIn and checkOut date)
  const currentBookingData = bookings.rows.find((booking) => {
    return booking.booking_id === currentBookingId;
  });
  console.log(currentBookingData);
  // return;
};

// Function to be tested
const bookRoom = async (req, res, next) => {
  const bookingId = req.params.booking_id;
  const roomId = req.params.room_id;
  if (!bookingId || !roomId) {
    return res.json({ errorMessage: "No booking id or no room id" });
  }
  await Booking.updateBookingWithRoom(bookingId, roomId);
  await Room.updateRoomWithBooking(roomId, bookingId);
  res.status(200).json({ status: "success" });
};

module.exports = { bookingDates, bookRoom, getUnbookedRooms };
