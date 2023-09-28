CREATE DATABASE
IF NOT EXISTS folio;

CREATE TABLE
IF NOT EXISTS folio.users
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR
(255),
  description TEXT
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    avatar_url VARCHAR(3000),
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp
);


CREATE TABLE IF NOT EXISTS user_review
(
  id INT,
  user_id INT,
  created_date TIMESTAMP,
  rating FLOAT,
  hotel_name VARCHAR(255),
  cuisine JSONB,
  review TEXT,
  sentimental_review FLOAT
);

CREATE TABLE IF NOT EXISTS reviews(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  rating int,
  review TEXT,
  created_at TIMESTAMP,
  tags JSONB,
  sentimental_score int,
  hotel_name VARCHAR(255)
)