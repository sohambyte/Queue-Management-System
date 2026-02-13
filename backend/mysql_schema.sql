
-- Database: queue_mgmt_db

CREATE DATABASE IF NOT EXISTS queue_mgmt_db;
USE queue_mgmt_db;

-- Table: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'STAFF', 'RECEPTION') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: services
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    description TEXT,
    average_time_minutes INT DEFAULT 15,
    status BOOLEAN DEFAULT TRUE
);

-- Table: counters
CREATE TABLE counters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    counter_name VARCHAR(50) NOT NULL,
    service_id INT,
    status BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Table: tokens
CREATE TABLE tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token_number VARCHAR(20) NOT NULL,
    service_id INT NOT NULL,
    counter_id INT,
    customer_name VARCHAR(100),
    phone VARCHAR(20),
    status ENUM('WAITING', 'CALLED', 'COMPLETED', 'CANCELLED') DEFAULT 'WAITING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    called_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (counter_id) REFERENCES counters(id)
);

-- Sample Data
INSERT INTO users (name, email, password, role) VALUES 
('Super Admin', 'admin@test.com', 'admin', 'ADMIN'),
('Medical Staff 1', 'staff@test.com', 'staff', 'STAFF'),
('Receptionist 1', 'recep@test.com', 'recep', 'RECEPTION');

INSERT INTO services (service_name, description, average_time_minutes) VALUES 
('General OPD', 'General Physician consultation', 15),
('Pharmacy', 'Medicine dispensing', 5),
('Radiology', 'X-Ray and Scans', 30);

INSERT INTO counters (counter_name, service_id) VALUES 
('Counter A', 1),
('Counter B', 1),
('Pharma Window', 2);
