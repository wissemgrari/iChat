INSERT INTO chats (id)
VALUES (nextval('chat_sequence'));

INSERT INTO user_chats (chat_id, participants)
VALUES (currval('chat_sequence'), 2);