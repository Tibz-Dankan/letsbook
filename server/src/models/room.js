const db = require("../database/dbConfig");

const Room = {};

Room.createRoom = (roomName, roomDescription, noOfBeds, price) => {
  return db.query(
    "INSERT INTO room(room_name, room_description, no_of_beds, price) VALUES($1,$2,$3,$4) RETURNING *",
    [roomName, roomDescription, noOfBeds, price]
  );
};

Room.updateRoomWithBooking = (roomId, bookingId) => {
  return db.query("UPDATE room SET booking_id = $1 WHERE room_id = $2", [
    bookingId,
    roomId,
  ]);
};

Room.getAllRooms = () => {
  return db.query("SELECT * FROM room ORDER BY room_id ASC");
};

Room.getRoomByRoomId = (roomId) => {
  return db.query("SELECT * FROM room WHERE room_id = $1", [roomId]);
};

Room.updateRoomWithImage = (roomId, roomImageUrl) => {
  return db.query("UPDATE room SET room_image_url = $1 WHERE room_id = $2", [
    roomImageUrl,
    roomId,
  ]);
};

Room.deleteRoom = (roomId) => {
  return db.query("DELETE FROM room WHERE room_id = $1", [roomId]);
};

Room.updateRoom = (roomId, roomName, roomDescription, noOfBeds, price) => {
  return db.query(
    "UPDATE room SET room_name = $1, room_description = $2, no_of_beds = $3, price = $4 WHERE room_id = $5",
    [roomName, roomDescription, noOfBeds, price, roomId]
  );
};

module.exports = Room;
