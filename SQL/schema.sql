CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
  user_ID INT NOT NULL AUTO_INCREMENT,
  userName VARCHAR(20),
  PRIMARY KEY (user_ID)
);

CREATE TABLE messages (
  /*Primary Key Location*/
  message_ID INT NOT NULL AUTO_INCREMENT,
  message_text TEXT,
  user_ID INT(3),
  roomName VARCHAR(10),
  created_At TIMESTAMP,
  PRIMARY KEY (message_ID),
  FOREIGN KEY (user_ID) REFERENCES users(user_ID)
);


CREATE TABLE friends (
  id INT NOT NULL AUTO_INCREMENT,
  user_ID INT(3),
  friends_ID INT(3),
  PRIMARY KEY (id),
  FOREIGN KEY (user_ID) REFERENCES users(user_ID),
  FOREIGN KEY (friends_ID) REFERENCES users(user_ID)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




