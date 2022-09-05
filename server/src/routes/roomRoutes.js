const express = require("express");
const {
  createARoom,
  getRooms,
  deleteRoom,
  updateRoom,
  upload,
  uploadRoomImage,
} = require("../controllers/roomController");
const { verifyJwtToken } = require("../utils/verifyJwtToken");

const router = express.Router();

router.post("/add-room", verifyJwtToken, createARoom);
router.get("/get-rooms", getRooms);
router.delete("/delete-room/:roomId", verifyJwtToken, deleteRoom);
router.put("/update-room/:roomId", verifyJwtToken, updateRoom);
router.post(
  "/upload-room-image/:roomId",
  verifyJwtToken,
  upload.single("file"),
  uploadRoomImage
);

module.exports = router;
