-- -- Create the users table
CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    password   VARCHAR(255)
);

-- Create the chats table
CREATE TABLE chats
(
    id           SERIAL PRIMARY KEY,
    participants INTEGER[]
);

-- Create the messages table
CREATE TABLE messages
(
    id          SERIAL PRIMARY KEY,
    receiver_id INTEGER NOT NULL,
    sender_id   INTEGER NOT NULL,
    created_at  TIMESTAMP(6),
    content     VARCHAR(255)
);