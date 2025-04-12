-- I am vibe coding my way out of this one

CREATE TYPE STATUS AS ENUM('active', 'terminated', 'cancelled');

-- Table: LOCATIONS
CREATE TABLE LOCATIONS (
    location_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    base_monthly_fee DECIMAL,
    joining_fee DECIMAL,
    annual_fee DECIMAL
);

-- Table: MEMBERS
CREATE TABLE MEMBERS (
    member_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    join_date DATE,
    membership_status STATUS,
    location_id INTEGER REFERENCES LOCATIONS(location_id)
);

-- Table: FAMILY_MEMBERS
CREATE TABLE FAMILY_MEMBERS (
    family_member_id SERIAL PRIMARY KEY,
    parent_member_id INTEGER REFERENCES MEMBERS(member_id),
    name VARCHAR(255),
    qr_code VARCHAR(255)
);

-- Table: QR_CODES
CREATE TABLE QR_CODES (
    qr_code_id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES MEMBERS(member_id),
    family_member_id INTEGER REFERENCES FAMILY_MEMBERS(family_member_id),
    location_id INTEGER REFERENCES LOCATIONS(location_id),
    status VARCHAR(50),
    issue_date DATE,
    uuid uuid NOT NULL DEFAULT gen_random_uuid()
);

-- Table: MEMBERSHIP_CHANGES
CREATE TABLE MEMBERSHIP_CHANGES (
    change_id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES MEMBERS(member_id),
    change_type VARCHAR(50),
    old_value TEXT,
    new_value TEXT,
    change_date DATE
);

-- Table: REPORTS
CREATE TABLE REPORTS (
    report_id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES MEMBERS(member_id),
    issue_description TEXT,
    location_id INTEGER REFERENCES LOCATIONS(location_id),
    status VARCHAR(50),
    submission_date DATE,
    resolution_date DATE
);

-- Add foreign key constraints if they weren't automatically created (optional but good practice)
ALTER TABLE FAMILY_MEMBERS
ADD CONSTRAINT fk_parent_member
FOREIGN KEY (parent_member_id)
REFERENCES MEMBERS(member_id);

ALTER TABLE QR_CODES
ADD CONSTRAINT fk_member
FOREIGN KEY (member_id)
REFERENCES MEMBERS(member_id);

ALTER TABLE QR_CODES
ADD CONSTRAINT fk_family_member
FOREIGN KEY (family_member_id)
REFERENCES FAMILY_MEMBERS(family_member_id);

ALTER TABLE QR_CODES
ADD CONSTRAINT fk_location
FOREIGN KEY (location_id)
REFERENCES LOCATIONS(location_id);

ALTER TABLE MEMBERS
ADD CONSTRAINT fk_location
FOREIGN KEY (location_id)
REFERENCES LOCATIONS(location_id);

ALTER TABLE MEMBERSHIP_CHANGES
ADD CONSTRAINT fk_member
FOREIGN KEY (member_id)
REFERENCES MEMBERS(member_id);

ALTER TABLE REPORTS
ADD CONSTRAINT fk_member
FOREIGN KEY (member_id)
REFERENCES MEMBERS(member_id);

ALTER TABLE REPORTS
ADD CONSTRAINT fk_location
FOREIGN KEY (location_id)
REFERENCES LOCATIONS(location_id);
