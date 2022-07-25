const express = require("express");
const { verifyJwtToken } = require("../utils/verifyJwtToken");

const {
  getUsersToChatWith,
  getChatMessages,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/chat/:user_id/:user_role", verifyJwtToken, getUsersToChatWith);
router.get("/chat-messages/:chat_room_id", verifyJwtToken, getChatMessages);

module.exports = router;
