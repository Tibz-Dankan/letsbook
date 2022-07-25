const db = require("../database/dbConfig");

const Booking = {};

Booking.createBooking = (userId, checkInDate, checkOutDate, bookingDate) => {
  return db.query(
    "INSERT INTO booking(user_id, check_in_date, check_out_date, booking_date) VALUES($1,$2,$3,$4) RETURNING *",
    [userId, checkInDate, checkOutDate, bookingDate]
  );
};

Booking.updateBookingWithRoom = (bookingId, roomId) => {
  return db.query("UPDATE booking SET room_id = $1 WHERE booking_id = $2", [
    roomId,
    bookingId,
  ]);
};

Booking.getAllBookings = () => {
  return db.query("SELECT * FROM booking");
};

Booking.getAllBookingRoomData = () => {
  const bookingRoomQuery =
    "SELECT bk.*, rm.room_name, rm.price FROM booking AS bk, room AS rm WHERE bk.room_id = rm.room_id";
  return db.query(bookingRoomQuery);
};

//Getting bookings with their respective users and rooms (For the manager to view)
Booking.getAllBookingRoomUserData = () => {
  const bookingRoomUserQuery =
    "SELECT bk.booking_id, bk.check_in_date, bk.check_out_date, bk.booking_date, bk.no_of_clients, bk.has_paid, bk.is_cancelled, rm.room_name, rm.price, users.user_name, users.country FROM booking AS bk, room AS rm, users WHERE bk.room_id = rm.room_id AND bk.user_id = users.user_id";
  return db.query(bookingRoomUserQuery);
};

Booking.getBookingByUserId = (userId) => {
  const usersBookingQuery =
    "SELECT bk.*, rm.room_name, rm.price, users.user_name, users.email, users.country FROM booking AS bk, room AS rm, users WHERE bk.room_id = rm.room_id AND bk.user_id = users.user_id AND users.user_id = $1";
  return db.query(usersBookingQuery, [userId]);
};

module.exports = Booking;
