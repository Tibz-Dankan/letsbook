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
-- add column named tel_number to the table users

-- TODO: Update table below in production(Done)
CREATE TABLE user_image_urls (
    image_url_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    user_image_url VARCHAR(250) NOT NULL 
);
-- TODO: rename column in table user_image_urls image_url to user_image_url (DONE in dev BUT check in PROD(Done))

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
    no_of_guests INTEGER DEFAULT null,
    room_id INTEGER DEFAULT null,
    has_paid BOOLEAN DEFAULT 'false',
    is_cancelled BOOLEAN DEFAULT 'false'
);

CREATE TABLE payment (  
    receipt_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    room_id INTEGER NOT NULL, 
    payment_date VARCHAR(50) NOT NULL,
    payment_mode VARCHAR(20) NOT NULL,
    amount_paid INTEGER NOT NULL
);

CREATE TABLE room (
    room_id SERIAL PRIMARY KEY, 
    room_name VARCHAR(50) NOT NULL,
    room_description VARCHAR(300) NOT NULL,
    no_of_beds INTEGER NOT NULL,
    price INTEGER NOT NULL,
    room_image_url VARCHAR(250) DEFAULT NULL
);
-- TODO: rename column image_url in table room to room_image_url

CREATE TABLE staff_token (
    token_id SERIAL PRIMARY KEY, 
    token VARCHAR(50) NOT NULL,
    date_of_generation  VARCHAR(50) NOT NULL,
    used_on  VARCHAR(50) DEFAULT null,
    generated_by INTEGER NOT NULL,
    used_by INTEGER DEFAULT null,
    is_valid BOOLEAN DEFAULT 'true'
);

-- ALTER TABLE room RENAME COLUMN image_url TO room_image_url;--TO BE DONE IN PRODUCTION
-- ALTER TABLE user_image_urls RENAME COLUMN image_url TO user_image_url;--TO BE DONE IN PRODUCTION
-- ALTER TABLE room ADD COLUMN booking_id INTEGER DEFAULT null; -- DONE(NO ACTION)
-- ALTER TABLE room DROP booking_id; -- DONE(NO ACTION)
-- ALTER TABLE booking ADD COLUMN no_of_clients INTEGER DEFAULT null; --DONE(NO ACTION)
-- ALTER TABLE room ADD COLUMN room_name VARCHAR(50) DEFAULT 'Not provided'; --DONE(NO ACTION)
-- ALTER TABLE booking RENAME COLUMN no_of_clients TO no_of_guests; --DONE(NO ACTION)
-- ALTER TABLE booking ALTER COLUMN no_of_guests DROP NOT NULL;    --DONE(NO ACTION)


-- ALTER TABLE room DROP room_image_url;  --DONE
--  ALTER TABLE room ADD  room_image_url VARCHAR(250) DEFAULT null; --DONE

ALTER TABLE room ADD COLUMN room_capacity_num INTEGER NOT NULL DEFAULT 2;
-- TODO: update the room capacity and remove the default constraint (2)


-- Adding not null constraint to columns
-- ALTER TABLE employee ALTER COLUMN email SET NOT NULL;  --one Column
-- ALTER TABLE employee ALTER COLUMN last_name SET NOT NULL ALTER COLUMN gender SET NOT NULL; --multiple columns

-- Removing the not null constraint from the column
-- ALTER TABLE employee ALTER COLUMN gender DROP NOT NULL;

--

