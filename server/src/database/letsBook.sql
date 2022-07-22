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


CREATE TABLE active_clients (
    active_client_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    date VARCHAR(50) NOT NULL
);

CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,  
    check_in_date VARCHAR(50) NOT NULL,
    check_out_date VARCHAR(50) NOT NULL,
    booking_date VARCHAR(50) NOT NULL,
    room_id INTEGER DEFAULT null,
    has_paid BOOLEAN DEFAULT 'false',
    is_cancelled BOOLEAN DEFAULT 'false'
);

CREATE TABLE receipt (  --TODO: change the table name to payment
    receipt_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    room_id INTEGER NOT NULL, 
    payment_date VARCHAR(50) NOT NULL,
    payment_mode VARCHAR(20) NOT NULL,
    amount_paid INTEGER NOT NULL
);

-- TODO: consider adding a column  room_name(Agreed column name)
CREATE TABLE room (
    room_id SERIAL PRIMARY KEY, 
    room_description VARCHAR(300) NOT NULL,
    no_of_beds INTEGER NOT NULL,
    price INTEGER NOT NULL,
    image_url VARCHAR(250) NOT NULL DEFAULT null
);

CREATE TABLE staff_token (
    token_id SERIAL PRIMARY KEY, 
    token VARCHAR(50) NOT NULL,
    date_of_generation  VARCHAR(50) NOT NULL,
    used_on  VARCHAR(50) DEFAULT null,
    generated_by INTEGER NOT NULL,
    used_by INTEGER DEFAULT null,
    is_valid BOOLEAN DEFAULT 'true'
);

-- ALTER TABLE room ADD COLUMN booking_id INTEGER DEFAULT null; -- DONE(NO ACTION)
-- ALTER TABLE room DROP booking_id; -- DONE(NO ACTION)


 