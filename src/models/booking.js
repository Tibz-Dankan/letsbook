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

module.exports = Booking;
