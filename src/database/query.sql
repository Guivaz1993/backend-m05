CREATE DATABASE mccalbackfeliz;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password text NOT NULL,
  cpf VARCHAR(14) DEFAULT NULL,
  phone VARCHAR(15) DEFAULT NULL
);

CREATE TABLE status_client (
	id SERIAL PRIMARY KEY,
  status VARCHAR(50) NOT NULL
);

INSERT INTO "status_client" (status) VALUES ('Inadimplente'),('Em dia');

CREATE TABLE clients (
	id SERIAL PRIMARY KEY,
  	name VARCHAR(180) NOT NULL,
  	email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    zipcode VARCHAR(9),	
    address TEXT,
    complement TEXT,
    district VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
  	status_id INT REFERENCES status_client(id) DEFAULT 1
);

CREATE TABLE status_debt (
	  id SERIAL PRIMARY KEY,
  	status VARCHAR(8) NOT NULL
);

INSERT INTO "status_debt" (status) VALUES ('Pendente'),('Pago'),('Vencido');

CREATE TABLE debts (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES clients(id) NOT NULL,
  description TEXT,
  value INT NOT NULL,
  due_date DATE NOT NULL,
  statusDebt_id INT REFERENCES status_debt(id) DEFAULT 1,
)

ALTER TABLE debts
  ADD COLUMN "is_deleted" BOOLEAN NOT NULL DEFAULT false 