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

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
	image_path VARCHAR(255) NOT NULL
);

CREATE TABLE subcategories (
    id SERIAL PRIMARY KEY,
	category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255) UNIQUE NOT NULL,
	image_path VARCHAR(255) NOT NULL
);

CREATE TABLE car_brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
	logo_path VARCHAR(255) NOT NULL
);

CREATE TABLE models (
    id SERIAL PRIMARY KEY,
	car_brand_id INT NOT NULL REFERENCES car_brands(id) ON DELETE CASCADE,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE generations (
    id SERIAL PRIMARY KEY,
	model_id INT NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    name VARCHAR(255) UNIQUE NOT NULL,
	year_start SMALLINT,
	year_end SMALLINT
);

CREATE TABLE engines (
    id SERIAL PRIMARY KEY,
	fuel_type SMALLINT NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE modifications (
    id SERIAL PRIMARY KEY,
	body_type SMALLINT NOT NULL,
	generation_id INT NOT NULL REFERENCES generations(id) ON DELETE CASCADE,
	engine_id INT NOT NULL REFERENCES engines(id) ON DELETE CASCADE
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL,
	logo_path VARCHAR(255) NOT NULL
);

CREATE TABLE autoparts (
    id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES brands(id) ON DELETE CASCADE,
	subcategory_id INT REFERENCES subcategories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price SMALLINT,
	quantity SMALLINT,
	discount DECIMAL
);

CREATE TABLE autoparts_images (
    id SERIAL PRIMARY KEY,
	autopart_id INT REFERENCES autoparts(id) ON DELETE CASCADE,
	image_path VARCHAR(255)
);

CREATE TABLE autoparts_attributes (
    id SERIAL PRIMARY KEY,
	autopart_id INT REFERENCES autoparts(id) ON DELETE CASCADE,
	type VARCHAR(255) NOT NULL,
	value VARCHAR(255) NOT NULL
);

CREATE TABLE autoparts_feedbacks (
    id SERIAL PRIMARY KEY,
	account_id INT REFERENCES accounts(id) ON DELETE CASCADE,
	autopart_id INT REFERENCES autoparts(id) ON DELETE CASCADE,
	feedback VARCHAR(255),
	rating SMALLINT NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
	account_id INT REFERENCES accounts(id) ON DELETE CASCADE,
	comment VARCHAR(255),
	order_date TIMESTAMP NOT NULL,
	status SMALLINT NOT NULL
);

CREATE TABLE orders_autoparts (
	ordered_price SMALLINT,
	order_id INT REFERENCES orders(id) ON DELETE CASCADE,
	autopart_id INT REFERENCES autoparts(id) ON DELETE CASCADE
);

SELECT * FROM accounts;
SELECT * FROM categories;
SELECT * FROM subcategories;
SELECT * FROM car_brands;
SELECT * FROM models;
SELECT * FROM generations;
SELECT * FROM engines;
SELECT * FROM modifications;
SELECT * FROM brands;
SELECT * FROM autoparts;
SELECT * FROM autoparts_images;
SELECT * FROM autoparts_attributes;
SELECT * FROM autoparts_feedbacks;
SELECT * FROM orders;
SELECT * FROM orders_autoparts;