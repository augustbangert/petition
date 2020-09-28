DROP TABLE IF EXISTS signatures;

CREATE TABLE signatures(
  id SERIAL PRIMARY KEY,
  first VARCHAR NOT NULL CHECK (first != ''),
  last VARCHAR NOT NULL CHECK (last != ''),
  signature VARCHAR NOT NULL CHECK (signature != '')
);

--\connect petition; // this line of code was on line 1 of this document. removed because i believe it was accidentally added.

-- this is test code to see if my postgres app was actually working
--SELECT * FROM signatures
--INSERT INTO signatures (first, last, signature) VALUES ('a','b','signature');