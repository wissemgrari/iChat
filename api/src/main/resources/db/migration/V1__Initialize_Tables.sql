-- -- Create the users table
CREATE TABLE IF NOT EXISTS users
(
    id         BIGSERIAL NOT NULL PRIMARY KEY,
    email      TEXT      NOT NULL
        CONSTRAINT user_email_unique UNIQUE,
    first_name TEXT      NOT NULL,
    last_name  TEXT      NOT NULL,
    password   TEXT      NOT NULL
);

-- Create the chats table
CREATE TABLE IF NOT EXISTS chats
(
    id BIGSERIAL NOT NULL PRIMARY KEY
);

-- Create the messages table
CREATE TABLE IF NOT EXISTS messages
(
    id         BIGSERIAL PRIMARY KEY NOT NULL,
    user_id    BIGINT                NOT NULL
        CONSTRAINT user_message_fk
            REFERENCES users,
    content    TEXT                  NOT NULL,
    created_at TIMESTAMP             NOT NULL
);


CREATE TABLE IF NOT EXISTS user_chats
(
    chat_id BIGINT NOT NULL
        CONSTRAINT chats_user_id_fk
            REFERENCES chats,
    user_id BIGINT NOT NULL
        CONSTRAINT user_chats_id_fk
            REFERENCES users
);

CREATE TABLE IF NOT EXISTS chat_messages
(
    chat_id    BIGINT NOT NULL
        CONSTRAINT chat_messages_id_fk
            REFERENCES chats,
    message_id BIGINT NOT NULL
        CONSTRAINT message_chats_id_fk
            REFERENCES messages
);