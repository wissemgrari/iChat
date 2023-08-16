DROP SEQUENCE IF EXISTS chats_seq;
DROP SEQUENCE IF EXISTS messages_seq;
DROP SEQUENCE IF EXISTS users_seq;

CREATE SEQUENCE chats_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE messages_seq START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE users_seq START WITH 1 INCREMENT BY 50;