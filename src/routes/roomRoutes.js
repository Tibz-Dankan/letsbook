const express = require("express");
const { createARoom } = require("../controllers/roomController");
const { verifyJwtToken } = require("../utils/verifyJwtToken");

const router = express.Router();

router.post("/add-room", verifyJwtToken, createARoom);

module.exports = router;
