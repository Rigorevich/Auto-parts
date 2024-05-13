CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(25),
    surname VARCHAR(25),
    phone_number VARCHAR(20),
    status SMALLINT NOT NULL,
    role SMALLINT NOT NULL
);

CREATE TABLE refresh_sessions (
    id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print VARCHAR(32) NOT NULL
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE models (
    id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES brands(id),
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE generations (
    id SERIAL PRIMARY KEY,
    model_id INT REFERENCES models(id),
    name VARCHAR(255) UNIQUE NOT NULL,
    year_start INT,
    year_end INT
);

CREATE TABLE autoparts (
    id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES brands(id),
    model_id INT REFERENCES models(id),
    generation_id INT REFERENCES generations(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE autoparts_images (
    id SERIAL PRIMARY KEY,
    autopart_id INT REFERENCES autoparts(id),
    image_path VARCHAR(255) NOT NULL
);

CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    patronymic VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE feedback_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES profile(id),
    category_id INT REFERENCES feedback_categories(id),
    feedback TEXT NOT NULL,
    rating SMALLINT NOT NULL
);


SELECT * FROM accounts;
SELECT * FROM refresh_sessions;
SELECT * FROM brands;
SELECT * FROM models;
SELECT * FROM generations;
SELECT * FROM feedback_categories;
SELECT * FROM feedback;