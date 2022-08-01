const Room = require("../models/room");
const multer = require("multer");
const admin = require("../database/firebaseConfig");
const saltedMd5 = require("salted-md5");
const path = require("path");

const createARoom = async (req, res, next) => {
  if (!req.body) return res.json({ errorMessage: "No room details provided" });
  const roomName = req.body.roomName;
  const roomDescription = req.body.roomDescription;
  const numberOfBeds = req.body.numberOfBeds;
  const roomPrice = req.body.roomPrice;
  const roomImage = req.body.roomPicture;

  await Room.createRoom(
    roomName,
    roomDescription,
    numberOfBeds,
    roomPrice,
    roomImage
  );
  res.status(200).json({ status: "success" });
};

// TODO : get room, update(edit) room, Delete room

const upload = multer({ storage: multer.memoryStorage() });

// // image upload to firebase
// const uploadImage = async (req, res) => {
//   const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
//   const fileName = name + path.extname(req.file.originalname);
//   console.log(fileName);
//   // uploading image file to firebase storage
//   await admin
//     .storage()
//     .bucket()
//     .file(fileName)
//     .createWriteStream()
//     .end(req.file.buffer);
//   console.log("image uploaded to firebase storage; ");
//   // TODO: consider saving image file name in the database
//   res.status(200).json({ status: "" });
// };

// image upload to cloudinary
const uploadImage = async (req, res) => {
  const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
  const fileName = name + path.extname(req.file.originalname);
  console.log(fileName);
  // uploading image file to firebase storage

  // TODO: consider saving image file name in the database
  res.status(200).json({ status: "" });
};

// get image file from firebase

const getImageFromFirebase = async (req, res) => {
  // TODO: consider getting an image file name from the database
  const fileRef = admin
    .storage()
    .bucket()
    .file("03aead66e97f0d50ce549b6fffc1b6d7.svg");
  const hash = await fileRef.download();

  // TODO: if an image contains https url, then the url or an image file its self
  console.log("file from firebase"); // to be removed
  console.log(hash); // to be removed
  res.contentType(fileRef.metadata.contentType);
  res.end(hash[0], "binary");
};

module.exports = { createARoom, upload, uploadImage };
