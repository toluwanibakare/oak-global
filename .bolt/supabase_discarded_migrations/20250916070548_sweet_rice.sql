-- OAK Global International Business Solutions Database
-- Created: 2025

CREATE DATABASE IF NOT EXISTS oakglobal;

USE oakglobal;

-- Contacts table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO contacts (name, email, message) VALUES 
('John Smith', 'john.smith@example.com', 'I am interested in your Business Performance Management services. Please contact me to discuss our requirements.'),
('Sarah Johnson', 'sarah.j@company.com', 'We need help with ISO compliance validation. Can you provide more information about your services?'),
('Michael Brown', 'mbrown@business.org', 'Looking for strategic planning assistance for our organization. Please send me more details.');