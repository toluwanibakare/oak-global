-- Oak Global MySQL Schema
-- Converted from Supabase PostgreSQL migrations

-- Create and select the database
CREATE DATABASE IF NOT EXISTS oak_global
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE oak_global;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS assessment_responses;
DROP TABLE IF EXISTS contacts;

-- ============================================
-- Table 1: Contacts Table
-- ============================================

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  service VARCHAR(255),
  message LONGTEXT NOT NULL,
  read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_contacts_email (email),
  KEY idx_contacts_created_at (created_at),
  KEY idx_contacts_read (read)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table 2: Assessment Responses Table
-- ============================================

CREATE TABLE assessment_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  company VARCHAR(255),
  category VARCHAR(255) NOT NULL,
  score INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  total_questions INT NOT NULL,
  yes_count INT NOT NULL DEFAULT 0,
  no_count INT NOT NULL DEFAULT 0,
  unsure_count INT NOT NULL DEFAULT 0,
  answers JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_assessment_responses_email (email),
  KEY idx_assessment_responses_category (category),
  KEY idx_assessment_responses_created_at (created_at),
  KEY idx_assessment_responses_score (score)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
