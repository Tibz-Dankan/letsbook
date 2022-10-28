const Room = require("../models/room");
const multer = require("multer");
const path = require("path");
const cloudinary = require("../utils/cloudinaryConfig");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

const createARoom = async (req, res, next) => {
  console.log(req.body);
  if (!req.body) return res.json({ errorMessage: "No room details provided" });
  const roomName = req.body.roomName;
  const roomDescription = req.body.roomDescription;
  const numberOfBeds = req.body.numberOfBeds;
  const roomPrice = req.body.roomPrice;
  // TODO: add roomCapacityNum  in the database

  const room = await Room.createRoom(
    roomName,
    roomDescription,
    numberOfBeds,
    roomPrice
  );
  res.status(200).json({ roomId: room.rows[0].room_id });
};

// TODO : get room, update(edit) room, Delete room
const getRooms = async (req, res, next) => {
  const rooms = await Room.getAllRooms();
  res.status(200).json(rooms.rows);
};

const deleteRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  if (!roomId) return res.json({ errorMessage: "No room id provide" });
  await Room.deleteRoom(roomId);
  res.status(200).json({ status: "success" });
};

const updateRoom = async (req, res, next) => {
  if (!req.body) return res.json({ errorMessage: "No room data provided" });
  const roomId = req.params.roomId;
  const roomName = req.body.roomName;
  const roomDescription = req.body.roomDescription;
  const noOfBeds = req.body.noOfBeds;
  const price = req.body.price;

  if (!roomId) return res.json({ errorMessage: "No room id provide" });
  await Room.updateRoom(roomId, roomName, roomDescription, noOfBeds, price);
  res.status(200).json({ status: "success" });
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const formatBufferToBase64String = (file) => {
  return parser.format(path.extname(file.originalname).toString(), file.buffer);
};

const uploadRoomImage = async (req, res) => {
  const roomId = req.params.roomId;
  const roomImage = req.body.image;
  if (!roomImage) return res.json({ errorMessage: "No Image file uploaded" });
  if (!roomId) return res.json({ errorMessage: "No room id provided" });
  // upload image to cloudinary
  const uploadRoomImg = await cloudinary.uploader.upload(roomImage);
  console.log(uploadRoomImg);
  const roomImageUrl = uploadRoomImg.secure_url;
  await Room.updateRoomWithImage(roomId, roomImageUrl);
  return res.status(200).json({ status: "success" });
};

module.exports = {
  createARoom,
  getRooms,
  deleteRoom,
  updateRoom,
  upload,
  uploadRoomImage,
};

// // successful upload response from cloudinary
// {
// asset_id: '038aca5376144f550e91083c4e1b9a50',
// public_id: 'k2jn9zahqdzxqma3g4zg',
// version: 1662218552,
// version_id: '9d7d5a62aa906121e18de30c22f35fac',
// signature: '35c32f20bee94b737d28bf25ea255097be199aab',
// width: 564,
// height: 752,
// format: 'jpg',
// resource_type: 'image',
// created_at: '2022-09-03T15:22:32Z',
// tags: [],
// bytes: 44815,
// type: 'upload',
// etag: 'a92c0ef115be66ce425c277386734f83',
// placeholder: false,
// url: 'http://res.cloudinary.com/dlmv4ot9h/image/upload/v1662218552/k2jn9zahqdzxqma3g4zg.jpg',
// secure_url: 'https://res.cloudinary.com/dlmv4ot9h/image/upload/v1662218552/k2jn9zahqdzxqma3g4zg.jpg',
// folder: '',
// access_mode: 'public',
// api_key: 'xxxxxxxxxxxxx'
// }
