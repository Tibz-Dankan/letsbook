CREATE DATABASE letsbook;

CREATE TABLE users (
   user_id SERIAL PRIMARY KEY ,
   user_name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   country VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   user_verify_token VARCHAR(50) NOT NULL,
   is_verified_email BOOLEAN NOT NULL,
   user_role VARCHAR(40) NOT NULL,
   UNIQUE (email) 
);

CREATE TABLE user_image_urls (
    image_url_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    image_url VARCHAR(250) NOT NULL DEFAULT null
);

CREATE TABLE chat_messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL, 
    recipient_id INTEGER NOT NULL, 
    chat_room_id VARCHAR(50) NOT NULL,
    date VARCHAR(50) NOT NULL,
    message VARCHAR(300) NOT NULL 
);

CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,  
    check_in_date VARCHAR(50) NOT NULL,
    check_out_date VARCHAR(50) NOT NULL,
    booking_date VARCHAR(50) NOT NULL,
    room_id INTEGER DEFAULT null,
    has_paid BOOLEAN DEFAULT 'false',
    is_Cancelled BOOLEAN DEFAULT 'false'
);

CREATE TABLE receipt (
    receipt_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    room_id INTEGER NOT NULL, 
    payment_date VARCHAR(50) NOT NULL,
    payment_mode VARCHAR(20) NOT NULL,
    amount_paid INTEGER NOT NULL
);

-- TODO: consider adding a room name
CREATE TABLE room (
    room_id SERIAL PRIMARY KEY, 
    room_description VARCHAR(300) NOT NULL,
    no_of_beds INTEGER NOT NULL,
    price INTEGER NOT NULL,
    image_url VARCHAR(250) NOT NULL DEFAULT null,
    booking_id INTEGER DEFAULT null
);

-- ALTER TABLE room ADD COLUMN booking_id INTEGER DEFAULT null; -- DONE(NO ACTION)


 