CREATE TYPE status AS ENUM('active', 'terminated', 'cancelled');
CREATE TABLE members (
	id INT PRIMARY KEY,
	fname VARCHAR(50) NOT NULL,
	lname VARCHAR(50) NOT NULL,
	address VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(10),
	join_date date NOT NULL,
	membership_status status NOT NULL
);
