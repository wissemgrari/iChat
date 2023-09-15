-- -- Create the users table
CREATE TABLE users
(
    id         BIGINT NOT NULL PRIMARY KEY,
    email      TEXT   NOT NULL
        CONSTRAINT user_email_unique
            UNIQUE,
    first_name TEXT   NOT NULL,
    last_name  TEXT   NOT NULL,
    password   TEXT   NOT NULL
);

-- Create the chats table
CREATE TABLE chats
(
    id         BIGINT                      NOT NULL PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);


-- Create the messages table
CREATE TABLE messages
(
    id         BIGINT                      NOT NULL PRIMARY KEY,
    chat_id    BIGINT                      NOT NULL
        CONSTRAINT chat_message_fk
            REFERENCES chats,
    user_id    BIGINT                      NOT NULL
        CONSTRAINT user_message_fk
            REFERENCES users,
    content    TEXT                        NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    status     VARCHAR(255)                NOT NULL
        CONSTRAINT messages_status_check
            CHECK ((status)::text = ANY ((ARRAY ['DELIVERED'::character varying, 'SEEN'::character varying])::text[]))
);


CREATE TABLE user_chat
(
    chat_id        BIGINT NOT NULL
        CONSTRAINT chat_id_fk
            REFERENCES chats,
    user_id        BIGINT NOT NULL
        CONSTRAINT user_id_fk
            REFERENCES users,
    participant_id BIGINT NOT NULL,
    CONSTRAINT user_chat_pkey
        PRIMARY KEY (chat_id, user_id)
);