USE home_db;

-- Create the `user` table
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `username` VARCHAR(100) PRIMARY KEY,
    `email` VARCHAR(100) UNIQUE
);

-- Create the `home` table with `street_address` as the primary key
DROP TABLE IF EXISTS `home`;

CREATE TABLE `home` (
    `street_address` VARCHAR(255) PRIMARY KEY,
    `state` VARCHAR(50),
    `zip` VARCHAR(10),
    `sqft` FLOAT,
    `beds` INT,
    `baths` INT,
    `list_price` FLOAT,
    UNIQUE KEY `unique_home` (`state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
);

-- Create the `user_homes_2` table for the many-to-many relationship
DROP TABLE IF EXISTS `user_homes_2`;

CREATE TABLE `user_homes_2` (
    `username` VARCHAR(100),
    `street_address` VARCHAR(255),
    PRIMARY KEY (`username`, `street_address`),
    FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE CASCADE,
    FOREIGN KEY (`street_address`) REFERENCES `home`(`street_address`) ON DELETE CASCADE
);

-- Insert distinct data into the `user` table
LOCK TABLES `user` WRITE;

INSERT INTO `user` (`username`, `email`)
SELECT DISTINCT `username`, `email`
FROM `user_home`;

UNLOCK TABLES;

-- Insert distinct data into the `home` table
LOCK TABLES `home` WRITE;

INSERT INTO `home` (`street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
SELECT DISTINCT `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`
FROM `user_home`;

UNLOCK TABLES;

-- Insert data into the `user_homes_2` table
LOCK TABLES `user_homes_2` WRITE;

INSERT INTO `user_homes_2` (`username`, `street_address`)
SELECT `username`, `street_address`
FROM `user_home`;

UNLOCK TABLES;

-- Drop the original `user_home` table
DROP TABLE IF EXISTS `user_home`;

-- Rename `user_homes_2` to `user_home`
RENAME TABLE `user_homes_2` TO `user_home`;
