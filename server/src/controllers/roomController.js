const Room = require("../models/room");
const multer = require("multer");
const admin = require("../database/firebaseConfig");
const saltedMd5 = require("salted-md5");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

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

// const upload = multer({ storage: multer.memoryStorage() });

// Temporary

// const path = "./file.txt";

const createDirectory = (dirName) => {
  //  dir path
  try {
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
  } catch (err) {
    console.error(err);
  }
};

// const testFolder = './tests/';
// const fs = require('fs');

const readFile = (filePath) => {
  fs.readdirSync(filePath).forEach((file) => {
    console.log(file);
  });
};

const removeFile = (imagePath) => {
  try {
    fs.unlinkSync(imagePath);
    //file removed
    console.log("image removed");
  } catch (err) {
    console.error(err);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/images");
    // console.log(file);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

// // get image file from firebase
// const getImageFromFirebase = async (req, res) => {
//   // TODO: consider getting an image file name from the database
//   const fileRef = admin
//     .storage()
//     .bucket()
//     .file("03aead66e97f0d50ce549b6fffc1b6d7.svg");
//   const hash = await fileRef.download();

//   // TODO: if an image contains https url, then the url or an image file its self
//   console.log("file from firebase"); // to be removed
//   console.log(hash); // to be removed
//   res.contentType(fileRef.metadata.contentType);
//   res.end(hash[0], "binary");
// };

// CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// image upload to cloudinary
const uploadImage = async (req, res) => {
  // const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
  // const imageFileName = name + path.extname(req.file.originalname);
  // const imageFilePath = ``;

  // // uploading image file to cloudinary
  // cloudinary.uploader.upload(imageFileName, (error, result) => {
  //   console.log("Image file upload result");
  //   console.log(result);
  //   console.log("result error log");
  //   console.log(result, error);
  //   // TODO: consider saving image file name in the database
  // });

  res.status(200).json({ status: "" });
};

module.exports = { createARoom, upload, uploadImage };
