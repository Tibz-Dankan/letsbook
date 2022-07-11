const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes");
const { chatTextMessages } = require("./controllers/chatController");

const app = express();

let url;

if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: process.env.PRODUCTION_URL }));
  url = PRODUCTION_URL;
} else {
  app.use(cors());
  url = "http://localhost:3000";
}

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: url,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

// user routes
app.use("/", userRoutes);

// chat routes
app.use("/", chatRoutes);

// chats
chatTextMessages(io);

// booking routes
app.use("/", bookingRoutes);

// room routes
app.use("/", roomRoutes);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`server started and running on port ${PORT}...`)
);
