const db = require("../database/dbConfig");

const Chat = {};

//  store chat messages
Chat.storeChatMessages = (senderId, recipientId, chatRoomId, date, message) => {
  return db.query(
    "INSERT INTO chat_messages(sender_id, recipient_id, chat_room_id, date, message) VALUES($1,$2,$3,$4,$5)  RETURNING *",
    [senderId, recipientId, chatRoomId, date, message]
  );
};

// Get chat messages by chat-room-id
Chat.getChatMessagesByChatRoomId = (chatRoomId) => {
  return db.query("SELECT * FROM chat_messages WHERE chat_room_id =$1", [
    chatRoomId,
  ]);
};

module.exports = Chat;
