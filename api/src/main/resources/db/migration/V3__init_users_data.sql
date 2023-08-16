-- Insert data into the users table
INSERT INTO users (id, first_name, last_name, email, password)
VALUES (nextval('users_seq'), 'Wissem', 'Grari', 'grariwissem@gmail.com', '$2a$10$.NyruY7apwsSBp6YodO9AO4Nlchu1iLkKcT5QrKIoVuDknTHuvaLC');

INSERT INTO users (id, first_name, last_name, email, password)
VALUES (nextval('users_seq'), 'John', 'Doe', 'johndoe@gmail.com', '$2a$10$jlLkw3aBC/ycSPKM6.FINutG749PoVjVqz16PqcCD9u6RVaEPcwGK');

INSERT INTO users (id, first_name, last_name, email, password)
VALUES (nextval('users_seq'), 'Jean', 'Smith', 'jeansmith@gmail.com', '$2a$10$SV0XckOh0A.syt0ycUYrKe3v.FuhleZJJ6El8sI7iH.QdEymFw0um');
