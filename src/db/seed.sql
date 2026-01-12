-- Reset sequences and seed teams
TRUNCATE teams, members RESTART IDENTITY CASCADE;

INSERT INTO teams (name) VALUES
  ('Engineering'),
  ('Design');

-- Seed members (3 per team)
-- Password: TestPassword1! (bcrypt hashed)
INSERT INTO members (name, team_id, email, password) VALUES
  ('Alice Smith', 1, 'alice@example.com', '$2b$10$SxBHa6Bkt/Q6yynmj8lK0u3qF.0UdjKJmg/jhEaLc1OHkQxyiD49m'),
  ('Bob Johnson', 1, 'bob@example.com', '$2b$10$SxBHa6Bkt/Q6yynmj8lK0u3qF.0UdjKJmg/jhEaLc1OHkQxyiD49m'),
  ('Carol Williams', 1, 'carol@example.com', '$2b$10$SxBHa6Bkt/Q6yynmj8lK0u3qF.0UdjKJmg/jhEaLc1OHkQxyiD49m'),
  ('Dan Brown', 2, 'dan@example.com', '$2b$10$SxBHa6Bkt/Q6yynmj8lK0u3qF.0UdjKJmg/jhEaLc1OHkQxyiD49m'),
  ('Eve Davis', 2, 'eve@example.com', '$2b$10$SxBHa6Bkt/Q6yynmj8lK0u3qF.0UdjKJmg/jhEaLc1OHkQxyiD49m'),
  ('Frank Miller', 2, 'frank@example.com', '$2b$10$SxBHa6Bkt/Q6yynmj8lK0u3qF.0UdjKJmg/jhEaLc1OHkQxyiD49m');
