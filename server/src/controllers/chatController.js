const User = require("../models/user");
const Chat = require("../models/chat");
require("dotenv").config();
// const NodeCache = require("node-cache");

const sortUserDataSendResponse = (usersArray, res) => {
  const users = [];
  usersArray.forEach(({ user_id, user_name, email, user_role, country }) => {
    users.push({
      user_id: user_id,
      user_name: user_name,
      email: email,
      user_role: user_role,
      country: country,
    });
  });
  return res.status(200).json(users);
};

// const saveUserDataInCache = async (userId, cache) => {
//   const user = await User.getUserById(userId);
//   if (!user.rows[0]) return res.json({ errorMessage: "User does not exist" });
//   const userObject = {
//     user_id: user.rows[0].user_id,
//     user_name: user.rows[0].user_name,
//     email: user.rows[0].email,
//     user_role: user.rows[0].user_role,
//     // TODO: consider adding user country here
//   };
//   if (user.rows[0].user_role === "user") {
//     if (cache.has("userDataObject")) {
//       const userArray = cache.get("userDataObject").userDataArray;
//       const doesNotContainUserId =
//         userArray[0].user_id !== user.rows[0].user_id;
//       doesNotContainUserId && userArray.push(userObject); // save new user to the cache
//     } else {
//       const userDataObject = {
//         userDataArray: [userObject],
//       };
//       cache.set("userDataObject", userDataObject, 1200); // save user in the cache for 20 minutes
//     }
//   }
//   console.log(cache.getStats()); // stats from the cache
//   return cache;
// };

// const getUsers = async (req, res, next) => {
//   const userId = req.params.user_id;
//   const userRole = req.params.user_role;
//   if (!userId || userId === undefined)
//     return res.json({ errorMessage: "No users id is provided" });

//   [false].forEach(async (useClones) => {
//     const cache = new NodeCache({ useClones: useClones });
//     let cachedData = await saveUserDataInCache(userId, cache);
//     console.log("function with cached data");
//     // console.log(cachedData);
//     if (userRole === "user") {
//       const supportTeam = await User.getSupportTeam();
//       return sortUserDataSendResponse(supportTeam.rows, res);
//     }
//     if (cachedData.has("userDataObject") === false) {
//       return res.json({ errorMessage: "No active clients" });
//     }
//     res.status(200).json(cachedData.get("userDataObject").userDataArray);
//   });
// };

const numberOfMinutes = (stringifiedDateObject) => {
  const minute = 1000 * 60;
  const date = JSON.parse(stringifiedDateObject).date;
  const numOfMinutes = (new Date(Date.now()) - new Date(date)) / minute;
  return Math.floor(numOfMinutes);
};

const saveActiveUser = async (userId) => {
  const currentDate = JSON.stringify({ date: new Date(Date.now()) });
  const activeUser = await Chat.getActiveClient(userId);
  if (!activeUser.rows[0]) {
    await Chat.createActiveClient(userId, currentDate);
  }
  if (activeUser.rows[0] && numberOfMinutes(activeUser.rows[0].date) > 15) {
    await Chat.updateActiveClientDate(userId, currentDate);
  }
};

const getActiveClientsSendResponse = async (res) => {
  let activeUserArray = [];
  const activeClients = await Chat.getAllActiveClients();
  activeClients.rows.forEach(async ({ user_id, date }, index) => {
    if (numberOfMinutes(date) <= 15) {
      const user = await User.getUserById(user_id);
      activeUserArray.push({
        user_id: user.rows[0].user_id,
        user_name: user.rows[0].user_name,
        email: user.rows[0].email,
        user_role: user.rows[0].user_role,
        country: user.rows[0].country,
      });
    }
    if (activeClients.rows.length === index + 1) {
      return res.status(200).json(activeUserArray);
    }
  });
};

const getUsersToChatWith = async (req, res, next) => {
  const userId = req.params.user_id;
  const userRole = req.params.user_role;
  if (!userId || !userRole) {
    return res.json({ errorMessage: "No user id or role is provided" });
  }
  if (userRole === "user") {
    // TODO: send push notification to the support team alerting them that client is active
    saveActiveUser(userId);
    const supportTeam = await User.getSupportTeam();
    return sortUserDataSendResponse(supportTeam.rows, res);
  }
  getActiveClientsSendResponse(res);
};

const getChatMessages = async (req, res, next) => {
  const chatRoomId = req.params.chat_room_id;
  if (!chatRoomId) return res.json({ errorMessage: "No chat room id" });
  const response = await Chat.getChatMessagesByChatRoomId(chatRoomId);
  res.status(200).json({ status: "success", data: response.rows });
  console.log("User getting chat messages");
};

const saveChatMessagesInDatabase = async (
  senderId,
  recipientId,
  chatRoomId,
  date,
  message
) => {
  await Chat.saveChatMessages(senderId, recipientId, chatRoomId, date, message);
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
    // save chat message in the in the database
    saveChatMessagesInDatabase(
      data.sender_Id,
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

module.exports = { chatTextMessages, getUsersToChatWith, getChatMessages };
