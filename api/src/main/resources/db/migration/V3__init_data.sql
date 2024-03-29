-- Insert data into the users table

INSERT INTO users (id, first_name, last_name, email, password)
VALUES (nextval('user_sequence'), 'Wissem', 'Grari', 'grariwissem@gmail.com',
        '$2a$10$.NyruY7apwsSBp6YodO9AO4Nlchu1iLkKcT5QrKIoVuDknTHuvaLC');
INSERT INTO users (id, first_name, last_name, email, password)
VALUES (nextval('user_sequence'), 'John', 'Doe', 'johndoe@gmail.com',
        '$2a$10$jlLkw3aBC/ycSPKM6.FINutG749PoVjVqz16PqcCD9u6RVaEPcwGK');
INSERT INTO users (id, first_name, last_name, email, password)
VALUES (nextval('user_sequence'), 'Jean', 'Doe', 'jeandoe@gmail.com',
        '$2a$10$SV0XckOh0A.syt0ycUYrKe3v.FuhleZJJ6El8sI7iH.QdEymFw0um');
INSERT INTO users (id, first_name, last_name, email, password)
VALUES (nextval('user_sequence'), 'Elon', 'Musk', 'elonmusk@gmail.com',
        '$2a$10$txXOTPku6GMUIIP8G9.0H.9hpKBCvk3rdvavKxTNALVDei8mOqbSC');
INSERT INTO users (id, first_name, last_name, email, password)
VALUES (nextval('user_sequence'), 'Djo', 'Hidouri', 'djohidouri1920@gmail.com',
        '$2a$10$FHzV3C4Vj.G//9QTXP8bKOjkrx6RQLAKWVzrK1.Fs9tm.wRU.hbqq');

-- ************************************************************************************************************* --

INSERT INTO chats (id, created_at)
VALUES (nextval('chat_sequence'), '2023-09-20 13:02:38.252443');

INSERT INTO user_chat (chat_id, user_id, participant_id)
VALUES (1, 1, 2);

-- ************************************************************************************************************* --

INSERT INTO chats (id, created_at)
VALUES (nextval('chat_sequence'), '2024-01-24 20:31:38.132443');

INSERT INTO user_chat (chat_id, user_id, participant_id)
VALUES (2, 4, 5);

-- ************************************************************************************************************* --
INSERT INTO messages (id, chat_id, user_id, content, created_at, status)
VALUES (nextval('message_sequence'), 1, 1, 'Hello there', '2023-09-20 13:02:48.433500',
        'DELIVERED');

INSERT INTO messages (id, chat_id, user_id, content, created_at, status)
VALUES (nextval('message_sequence'), 1, 2, 'Hi!', '2023-09-22 19:13:52.248482', 'DELIVERED');

INSERT INTO messages (id, chat_id, user_id, content, created_at, status)
VALUES (nextval('message_sequence'), 1, 1, 'How are you doing', '2023-09-22 19:14:00.433500',
        'DELIVERED');
