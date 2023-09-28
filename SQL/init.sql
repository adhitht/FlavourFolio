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

CREATE TABLE
IF NOT EXISTS folio.users
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR
(255),
  description TEXT
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