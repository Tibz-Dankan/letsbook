const express = require("express");
// const { verifyToken } = require("../utils/verifyToken");
const { getUsers, getChatMessages } = require("../controllers/chatController");

const router = express.Router();

router.get("/chat/:user_id", getUsers);
router.get("/chat-messages/:chat_room_id", getChatMessages);

module.exports = router;
