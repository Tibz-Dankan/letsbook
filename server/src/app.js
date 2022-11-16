const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const compression = require("compression");
const { chatTextMessages } = require("./controllers/chatController");

const app = express();

let url;

if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: process.env.PRODUCTION_URL }));
  url = process.env.PRODUCTION_URL;
} else {
  app.use(cors());
  url = "http://localhost:5173";
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

app.use(express.urlencoded({ extended: true }));

app.use(compression());

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

// payment routes
app.use("/", paymentRoutes);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`server started and running on port ${PORT}...`)
);

module.exports = app;

// git subtree push --prefix server heroku master
//  heroku git:remote -a unique-app-name-to-be-entered //connecting to an existing app on heroku
//  heroku pg:psql -a unique-app-name-to-be-entered // open psql of heroku app specified
