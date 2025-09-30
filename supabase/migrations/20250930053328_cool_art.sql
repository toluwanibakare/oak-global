/*
  # Create assessment responses table

  1. New Tables
    - `assessment_responses`
      - `id` (uuid, primary key)
      - `email` (text, required)
      - `name` (text, optional)
      - `company` (text, optional)
      - `category` (text, required) - assessment category (finances, customers, etc.)
      - `score` (integer, required) - percentage score (0-100)
      - `status` (text, required) - assessment status (Excellent, Good, etc.)
      - `total_questions` (integer, required)
      - `yes_count` (integer, required)
      - `no_count` (integer, required)
      - `unsure_count` (integer, required)
      - `answers` (jsonb, required) - detailed answers to all questions
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `assessment_responses` table
    - Add policy for anonymous users to insert assessment responses
    - Add policy for authenticated users to read assessment responses
*/

CREATE TABLE IF NOT EXISTS assessment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  company text,
  category text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  status text NOT NULL,
  total_questions integer NOT NULL,
  yes_count integer NOT NULL DEFAULT 0,
  no_count integer NOT NULL DEFAULT 0,
  unsure_count integer NOT NULL DEFAULT 0,
  answers jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert assessment responses"
  ON assessment_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read assessment responses"
  ON assessment_responses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update assessment responses"
  ON assessment_responses
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_assessment_responses_email ON assessment_responses(email);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_category ON assessment_responses(category);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_created_at ON assessment_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_score ON assessment_responses(score);