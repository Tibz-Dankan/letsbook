const db = require("../database/dbConfig");

const Room = {};

Room.createRoom = (roomName, roomDescription, noOfBeds, price, image) => {
  return db.query(
    "INSERT INTO room(room_name, room_description, no_of_beds, price, image_url) VALUES($1,$2,$3,$4,$5)",
    [roomName, roomDescription, noOfBeds, price, image]
  );
};

Room.updateRoomWithBooking = (roomId, bookingId) => {
  return db.query("UPDATE room SET booking_id = $1 WHERE room_id = $2", [
    bookingId,
    roomId,
  ]);
};

Room.getAllRooms = () => {
  return db.query("SELECT * FROM room");
};

Room.getRoomByRoomId = (roomId) => {
  return db.query("SELECT * FROM room WHERE room_id = $1", [roomId]);
};

module.exports = Room;
