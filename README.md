# LetsBook is a hotel booking system with chat and payment sub-systems.

## The system is written in react and redux for the frontend while nodejs and expressjs for the backend. Postgres is the database used.

To get started with the frontend which is contained in a folder named client run the commands below in the terminal. You need nodejs to be installed on your machine. If you don't, then you can download and install nodejs by visiting [nodejs.org](https://nodejs.org)

### npm install

To install dependencies

### npm start

To start the react server locally.

To get started with backend which is contained in the folder named server run the commands below

### npm install

To install the dependencies

### npm run server

To start the nodejs server locally.

## Environment variables setup

To fully started with backend you need to add following environment variables in your .env file

#### JWT_SECRETE_TOKEN

This is a base64 string and looks like on below.

```
6534fc6cff6483774ea17c34bd5f1bbec5701e95120c0a490cc092a9b00a138b
```

#### Postgres Database .env variables

```env
USER  = postgres
HOST = localhost
PASSWORD =  your postgres password
PORT = 5432
DATABASE = letsbook
```

**NOTE**

#### USER

The user in most is always **postgres** when connect to the postgres database on a local machine.

#### HOST

The host is **localhost** since the database is installed on a local machine

#### PASSWORD

The password provided here is one you created when installing postgres on your machine.

#### PORT

The port in most cases is **5432** which is a default port number postgres runs on. if your port number is different from the above mentioned, then specify the actual port for your postgres in the .env file

#### DATABASE

For this project the database is **letsbook** .

## Create database and tables

### Follow the steps below

1. step one (1)
   Open the psql shell that comes with postgres.

1. step two (2)
   Create database by running the sql command below in the shell

```sql
CREATE DATABASE letsbook;
```

3. step three (3)
   Connect to database **letsbook** if created successfully. use the command below

```sql
\c letsbook
```

4. step four (4)
   Then run sql commands below to create the tables.

```sql

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
    user_image_url VARCHAR(250) NOT NULL
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

CREATE TABLE staff_token (
    token_id SERIAL PRIMARY KEY,
    token VARCHAR(50) NOT NULL,
    date_of_generation  VARCHAR(50) NOT NULL,
    used_on  VARCHAR(50) DEFAULT null,
    generated_by INTEGER NOT NULL,
    used_by INTEGER DEFAULT null,
    is_valid BOOLEAN DEFAULT 'true'
);
```

> All the above sql commands are in the letsbook.sql file which is contained in folder named Database

## Known issues (work in progress)

This project is still on going. Payment sub-system is still under implementation by the team
