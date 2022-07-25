const express = require("express");
const {
  createARoom,
  upload,
  uploadImage,
} = require("../controllers/roomController");
const { verifyJwtToken } = require("../utils/verifyJwtToken");

const router = express.Router();

router.post("/add-room", verifyJwtToken, createARoom);
router.post(
  "/upload-image",
  verifyJwtToken,
  upload.single("file"),
  uploadImage
);

module.exports = router;
