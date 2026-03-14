const { Client } = require("pg");
const res = require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS user_details(
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  is_member BOOLEAN,
  is_admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS user_msgs(
  msg_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  msg_title TEXT,
  message TEXT,
  user_id INT,
  created_at TIMESTAMPTZ DEFAULT NOW(), 
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
    REFERENCES user_details(user_id)
)
`;
const initialize = async () => {
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    console.log("Connected to database");

    await client.query(SQL);
    console.log("Seeding successful");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log("Database connection closed");
  }
};

initialize();
