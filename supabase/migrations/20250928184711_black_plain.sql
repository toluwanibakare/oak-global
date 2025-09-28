/*
  # Create contacts table for Oak Global website

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `company` (text, optional)
      - `service` (text, optional)
      - `message` (text, required)
      - `created_at` (timestamp)
      - `read` (boolean, default false)

  2. Security
    - Enable RLS on `contacts` table
    - Add policy for authenticated users to manage contacts
    - Add policy for anonymous users to insert contacts
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  service text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert contact messages
CREATE POLICY "Anyone can insert contacts"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all contacts (for admin)
CREATE POLICY "Authenticated users can read contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update contacts (for admin)
CREATE POLICY "Authenticated users can update contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true);