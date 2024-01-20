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
VALUES (nextval('user_sequence'), 'Sarah', 'Smith', 'sarahsmith@gmail.com',
        '$2a$10$pF1pxa3J0Z98gNkCBZMW5.uDW55hQmy27cQwHm2/ZRaGWEVf/gO3O');

-- ************************************************************************************************************* --

INSERT INTO chats (id, created_at)
VALUES (nextval('chat_sequence'), '2023-09-20 13:02:38.252443');

INSERT INTO user_chat (chat_id, user_id, participant_id)
VALUES (1, 1, 2);

-- ************************************************************************************************************* --

INSERT INTO chats (id, created_at)
VALUES (nextval('chat_sequence'), '2024-01-24 20:31:38.132443');

INSERT INTO user_chat (chat_id, user_id, participant_id)
VALUES (2, 2, 3);

-- ************************************************************************************************************* --
INSERT INTO messages (id, chat_id, user_id, content, created_at, status)
VALUES (nextval('message_sequence'), currval('chat_sequence'), 1, 'Hello there', '2023-09-20 13:02:48.433500',
        'DELIVERED');

INSERT INTO messages (id, chat_id, user_id, content, created_at, status)
VALUES (nextval('message_sequence'), currval('chat_sequence'), 2, 'Hi!', '2023-09-22 19:13:52.248482', 'DELIVERED');

INSERT INTO messages (id, chat_id, user_id, content, created_at, status)
VALUES (nextval('message_sequence'), currval('chat_sequence'), 1, 'How are you doing', '2023-09-22 19:14:00.433500',
        'DELIVERED');
