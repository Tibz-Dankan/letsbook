const express = require("express");
const {
  bookingDates,
  bookRoom,
  getUnbookedRooms,
} = require("../controllers/bookingController");
const { verifyJwtToken } = require("../utils/verifyJwtToken");

const router = express.Router();

router.post("/booking-date/:user_id", verifyJwtToken, bookingDates);
router.post("/book-room/:booking_id/:room_id", verifyJwtToken, bookRoom);
router.get("/get-unbooked-rooms/:booking_id", verifyJwtToken, getUnbookedRooms);

module.exports = router;
