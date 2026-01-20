require("dotenv").config();
const { Client } = require('pg');

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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
    REFERENCES user_details(user_id)
)
`
const initialize = async () => {
  const client = new Client({
   connectionString: process.env.DB_CONNECTION_STRING,
  })
  console.log("seeding......")

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("end..........")
}

initialize();

