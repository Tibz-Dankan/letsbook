const Room = require("../models/room");

const createARoom = async (req, res, next) => {
  if (!req.body) return res.json({ errorMessage: "No room details provided" });
  const roomDescription = req.body.roomDescription;
  const numberOfBeds = req.body.numberOfBeds;
  const roomPrice = req.body.roomPrice;
  const roomImage = req.body.roomPicture;

  await Room.createRoom(roomDescription, numberOfBeds, roomPrice, roomImage);
  res.status(200).json({ status: "success" });
};

module.exports = { createARoom };
