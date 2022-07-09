const User = require("../models/user");
const Chat = require("../models/chat");
require("dotenv").config();
const NodeCache = require("node-cache");
const cache = new NodeCache();

const sortUserInfoSendResponse = (usersArray, res) => {
  const users = [];
  usersArray.forEach(({ user_id, user_name, email, user_role }) => {
    users.push({
      user_id: user_id,
      user_name: user_name,
      email: email,
      user_role: user_role,
    });
  });
  return res.status(200).json(users);
};

const saveUserDataInCache = async (userId) => {
  const user = await User.getUserById(userId);
  if (!user.rows[0]) return res.json({ errorMessage: "User does not exist" });
  let users = [];
  // if "userData" key exists in the cache
  // if (cache.get("userData") !== undefined) {
  //   users = cache.get("userData"); //update users array with cached data
  //   // cache.take("userData"); // clear the cache
  // }
  // add new user to the users array
  const usersArray = users.push({
    user_id: user.rows[0].user_id,
    user_name: user.rows[0].user_name,
    email: user.rows[0].email,
    user_role: user.rows[0].user_role,
  });
  cache.set("userData", usersArray, 1200); // save user in the cache for 20 minutes
  console.log(cache.get("userData")); // to be removed
};

const getUsers = async (req, res, next) => {
  const userId = req.params.user_id;
  const userRole = req.params.user_role;
  if (!userId || userId === undefined)
    return res.json({ errorMessage: "No users id is provided" });

  if (userRole === "user") {
    saveUserDataInCache(userId);
    console.log("cached user data: "); // to be removed
    console.log(cache.get("userData")); // to be removed
    const supportTeam = await User.getSupportTeam();
    const supportTeamArray = supportTeam.rows;
    console.log("Getting support Team to chat with");
    return sortUserInfoSendResponse(supportTeamArray, res);
  }
  if (cache.get("userData") == undefined) {
    return res.json({ errorMessage: "No active clients" });
  }
  res.status(200).json(cache.get("userData"));
};

const getChatMessages = async (req, res, next) => {
  const chatRoomId = req.params.chat_room_id;
  if (!chatRoomId) return res.json({ errorMessage: "No chat room id" });
  const response = await Chat.getChatMessagesByChatRoomId(chatRoomId);
  res.status(200).json({ status: "success", data: response.rows });
  console.log("User getting chat messages");
};

const storeChatMessagesInDatabase = async (
  senderId,
  recipientId,
  chatRoomId,
  date,
  message
) => {
  await Chat.storeChatMessages(
    senderId,
    recipientId,
    chatRoomId,
    date,
    message
  );
  console.log("chat message stored in the database");
};

// Join room
const joinRoom = (socket) => {
  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log("User joined room with Id#: " + data);
  });
};

//receive and Send messages
const receiveSendMessages = (socket) => {
  socket.on("sendMessage", (data) => {
    console.log("Message sent: ");
    console.log(data);
    socket.to(data.chatRoomId).emit("receiveMessage", data);
    // store chat message in the in the database
    storeChatMessagesInDatabase(
      data.senderId,
      data.recipientId,
      data.chatRoomId,
      data.date,
      data.message
    );
  });
};

// Leave room
const leaveRoom = (socket) => {
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
};

const chatTextMessages = (io) => {
  io.on("connection", (socket) => {
    console.log("socket id: " + socket.id);
    joinRoom(socket);
    receiveSendMessages(socket);
    leaveRoom(socket);
  });
};

module.exports = { chatTextMessages, getUsers, getChatMessages };
