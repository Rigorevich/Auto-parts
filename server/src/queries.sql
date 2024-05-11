CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    role SMALLINT NOT NULL
);

CREATE TABLE refresh_sessions(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print VARCHAR(32) NOT NULL
);

CREATE TABLE Brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE Models (
    id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES Brands(id),
    name VARCHAR(255)
);

CREATE TABLE Generations (
    id SERIAL PRIMARY KEY,
    model_id INT REFERENCES Models(id),
    generation_name VARCHAR(255),
    year_start INT,
    year_end INT
);


SELECT * FROM users;
SELECT * FROM refresh_sessions;