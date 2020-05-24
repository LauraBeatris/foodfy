CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT,
  path TEXT NOT NULL
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	reset_token TEXT,
	reset_token_expires TEXT,
	is_admin BOOLEAN DEFAULT false,
	updated_at TIMESTAMP DEFAULT now(),
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE chefs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  file_id INTEGER REFERENCES files(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  ingredients TEXT[] NOT NULL,
  preparations TEXT[] NOT NULL,
  information TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  chef_id INTEGER
  REFERENCES chefs(id),

  user_id INTEGER
  REFERENCES users(id)
  ON DELETE CASCADE
);

CREATE TABLE recipe_files (
  id SERIAL PRIMARY KEY,

  recipe_id INTEGER NOT NULL
  REFERENCES recipes(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,


  file_id INTEGER NOT NULL
  REFERENCES files(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session"
ADD CONSTRAINT "session_pkey"
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
