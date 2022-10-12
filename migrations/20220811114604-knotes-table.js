'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
  CREATE TABLE users(
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (30),
    password VARCHAR(250),
    PRIMARY KEY(user_id)
  );
  CREATE TABLE quotes(
    quote_id INT PRIMARY KEY,
    quote TEXT,
    user_id INT,

    CONSTRAINT fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
  );
  CREATE TABLE notes(
    note_id INT GENERATED ALWAYS AS IDENTITY,
    subject VARCHAR(150),
    note TEXT,
    user_id INT,
    date BIGINT,
    PRIMARY KEY(note_id),

    CONSTRAINT fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
  );
  CREATE TABLE quote_notes(
    quote_notes_id INT GENERATED ALWAYS AS IDENTITY,
    quote_id INT,
    note_id INT,
    user_id INT,
    PRIMARY KEY(quote_notes_id),

    CONSTRAINT fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users(user_id),

    CONSTRAINT fk_quote_id
    FOREIGN KEY(quote_id)
    REFERENCES quotes(quote_id),

    CONSTRAINT fk_note_id
    FOREIGN KEY(note_id)
    REFERENCES notes(note_id)
  );

  INSERT INTO users(username, password) VALUES ('admin', '$2b$10$wRR68jisybugMzdjqehiuORgKgoG6a43MfKbRIfUdq0AMrqiG0H9G'), ('kamil1907', '$2b$10$PRW7WH2zgu/RHF8QXLyTDeJWV02i9Uo3aS6KTdZTJd7m9EUWAj0wm');
  INSERT INTO quotes(quote_id, quote, user_id) VALUES('2', 'wasser findet seinen weg', '2'),('4', 'kamil kamil', '2'), (3, 'wer hoch flieg fällt tief', '1');
  INSERT INTO notes(subject, note, user_id, date) VALUES ('Wasser', 'Du sollst unaufhaltsam sein', '2', '1660154205000'), ('Fliegen', 'du sollst nicht so hoch fliegen haha', 1, '1659697005000');
  INSERT INTO quote_notes(quote_id, note_id, user_id) VALUES (2, 1, 2), (2,2, 1);
  
  `);
};

exports.down = function(db) {
  return db.runSql(`
  DROP TABLE IF EXISTS quote_notes;
  DROP TABLE IF EXISTS notes;
  DROP TABLE IF EXISTS quotes;
  DROP TABLE IF EXISTS users;`);
};

exports._meta = {
  "version": 1
};
