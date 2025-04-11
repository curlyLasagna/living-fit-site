-- Seed data for LOCATIONS table
INSERT INTO LOCATIONS (location_id, name, address, base_monthly_fee, joining_fee, annual_fee) VALUES
(1, 'Main Street Gym', '123 Main St, Anytown, USA', 50.00, 25.00, 500.00),
(2, 'Downtown Fitness', '456 Market Ave, Anytown, USA', 60.00, 30.00, 600.00),
(3, 'Suburban Wellness Center', '789 Oak Ln, Anytown, USA', 45.00, 20.00, 450.00);

-- Seed data for MEMBERS table
INSERT INTO MEMBERS (member_id, name, address, email, phone, join_date, membership_status, location_id) VALUES
(101, 'Alice Smith', '10 Pine Rd, Anytown, USA', 'alice.smith@example.com', '555-1111', '2024-01-15', 'active', 1),
(102, 'Bob Johnson', '22 Elm St, Anytown, USA', 'bob.johnson@example.com', '555-2222', '2023-11-20', 'active', 2),
(103, 'Charlie Brown', '33 Willow Dr, Anytown, USA', 'charlie.brown@example.com', '555-3333', '2024-03-01', 'active', 1),
(104, 'Diana Davis', '44 Maple Ave, Anytown, USA', 'diana.davis@example.com', '555-4444', '2023-09-10', 'terminated', 3),
(105, 'Eve Wilson', '55 Oak St, Anytown, USA', 'eve.wilson@example.com', '555-5555', '2024-02-25', 'active', 2);

-- Seed data for FAMILY_MEMBERS table
INSERT INTO FAMILY_MEMBERS (family_member_id, parent_member_id, name, qr_code) VALUES
(201, 101, 'John Smith', 'FS12345'),
(202, 101, 'Jane Smith', 'FS67890'),
(203, 102, 'Linda Johnson', 'FJ09876'),
(204, 103, 'Sally Brown', 'FC54321');

-- Seed data for QR_CODES table
INSERT INTO QR_CODES (qr_code_id, member_id, family_member_id, location_id, status, issue_date, uuid) VALUES
(301, 101, NULL, 1, 'active', '2024-01-15', gen_random_uuid()),
(302, 102, NULL, 2, 'active', '2023-11-20', gen_random_uuid()),
(303, 103, NULL, 1, 'active', '2024-03-01', gen_random_uuid()),
(304, NULL, 201, 1, 'active', '2024-01-15', gen_random_uuid()),
(305, NULL, 202, 1, 'active', '2024-01-15', gen_random_uuid()),
(306, NULL, 203, 2, 'active', '2023-11-20', gen_random_uuid()),
(307, NULL, 204, 1, 'active', '2024-03-01', gen_random_uuid()),
(308, 104, NULL, 3, 'inactive', '2023-09-10', gen_random_uuid()),
(309, 105, NULL, 2, 'active', '2024-02-25', gen_random_uuid());

-- Seed data for MEMBERSHIP_CHANGES table
INSERT INTO MEMBERSHIP_CHANGES (change_id, member_id, change_type, old_value, new_value, change_date) VALUES
(401, 101, 'address_change', '123 Pine Ln', '10 Pine Rd', '2024-02-01'),
(402, 102, 'membership_status_change', 'pending', 'active', '2023-11-20'),
(403, 104, 'membership_status_change', 'active', 'terminated', '2024-04-01'),
(404, 105, 'location_change', '1', '2', '2024-03-10');

-- Seed data for REPORTS table
INSERT INTO REPORTS (report_id, member_id, issue_description, location_id, status, submission_date, resolution_date) VALUES
(501, 101, 'Broken treadmill', 1, 'open', '2024-03-15', NULL),
(502, 102, 'Locker malfunction', 2, 'closed', '2024-02-20', '2024-02-25'),
(503, 103, 'Cleanliness issue in showers', 1, 'open', '2024-04-05', NULL),
(504, 105, 'Equipment missing', 2, 'pending', '2024-03-25', NULL);