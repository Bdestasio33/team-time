-- Reset sequences and seed teams
TRUNCATE teams, members RESTART IDENTITY CASCADE;

INSERT INTO teams (name) VALUES
  ('Engineering'),
  ('Design');

-- Seed members (3 per team)
-- Password: TestPassword1! (bcrypt hashed)
INSERT INTO members (name, team_id, email, password) VALUES
  ('Alice Smith', 1, 'alice@example.com', '$2b$10$rQZ5h.H5yQXUQKNqT5Zn6OqVQZJPYO3/vKZnVE8f.xP4/0lPxVFnG'),
  ('Bob Johnson', 1, 'bob@example.com', '$2b$10$rQZ5h.H5yQXUQKNqT5Zn6OqVQZJPYO3/vKZnVE8f.xP4/0lPxVFnG'),
  ('Carol Williams', 1, 'carol@example.com', '$2b$10$rQZ5h.H5yQXUQKNqT5Zn6OqVQZJPYO3/vKZnVE8f.xP4/0lPxVFnG'),
  ('Dan Brown', 2, 'dan@example.com', '$2b$10$rQZ5h.H5yQXUQKNqT5Zn6OqVQZJPYO3/vKZnVE8f.xP4/0lPxVFnG'),
  ('Eve Davis', 2, 'eve@example.com', '$2b$10$rQZ5h.H5yQXUQKNqT5Zn6OqVQZJPYO3/vKZnVE8f.xP4/0lPxVFnG'),
  ('Frank Miller', 2, 'frank@example.com', '$2b$10$rQZ5h.H5yQXUQKNqT5Zn6OqVQZJPYO3/vKZnVE8f.xP4/0lPxVFnG');
