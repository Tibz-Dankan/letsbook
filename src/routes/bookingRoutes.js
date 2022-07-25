const express = require("express");
const {
  bookingDates,
  bookRoom,
  getUnbookedRooms,
  getMyBookings,
  getAllBookings,
} = require("../controllers/bookingController");
const { verifyJwtToken } = require("../utils/verifyJwtToken");

const router = express.Router();

router.post("/booking-date/:user_id", verifyJwtToken, bookingDates);
router.get("/get-unbooked-rooms/:booking_id", verifyJwtToken, getUnbookedRooms);
router.post("/book-room/:booking_id", verifyJwtToken, bookRoom);
router.get("/get-my-bookings/:user_id", verifyJwtToken, getMyBookings);
router.get("/get-all-bookings", verifyJwtToken, getAllBookings);

module.exports = router;
