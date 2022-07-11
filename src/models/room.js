const db = require("../database/dbConfig");

const Room = {};

Room.createRoom = (roomDescription, noOfBeds, price, image) => {
  return db.query(
    "INSERT INTO room(room_description, no_of_beds, price, image_url) VALUES($1,$2,$3,$4)",
    [roomDescription, noOfBeds, price, image]
  );
};

Room.updateRoomWithBooking = (roomId, bookingId) => {
  return db.query("UPDATE room SET booking_id = $1 WHERE room_id = $2", [
    bookingId,
    roomId,
  ]);
};

module.exports = Room;
