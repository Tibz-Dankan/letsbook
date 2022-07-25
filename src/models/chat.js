const db = require("../database/dbConfig");

const Chat = {};

//  store chat messages
Chat.saveChatMessages = (senderId, recipientId, chatRoomId, date, message) => {
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

// create active client
Chat.createActiveClient = (userId, date) => {
  return db.query(
    "INSERT INTO active_clients(user_id, date) VALUES($1,$2)  RETURNING *",
    [userId, date]
  );
};

// get active client
Chat.getActiveClient = (userId) => {
  return db.query("SELECT * FROM active_clients WHERE user_id =$1", [userId]);
};

// get all active clients
Chat.getAllActiveClients = () => {
  return db.query("SELECT * FROM active_clients");
};

// update active client date
Chat.updateActiveClientDate = (userId, date) => {
  return db.query(
    "UPDATE active_clients SET date = $1 WHERE user_id = $2 RETURNING *",
    [date, userId]
  );
};

// delete active client
Chat.deleteActiveClient = (userId) => {
  return db.query("DELETE FROM active_clients WHERE user_id = $1", [userId]);
};

module.exports = Chat;
