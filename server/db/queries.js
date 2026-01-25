const pool = require("./pool");

const createUser = async (
  firstName,
  lastName,
  email,
  password,
  isMember = false,
  isAdmin = false,
) => {
  const res = await pool.query(
    "INSERT INTO user_details(first_name, last_name, email, password, is_member, is_admin) values ($1, $2, $3, $4, $5, $6)",
    [firstName, lastName, email, password, isMember, isAdmin],
  );
  return res.rowCount;
};

const getUser = async (email) => {
  const res = await pool.query("SELECT * FROM user_details WHERE email=$1", [
    email,
  ]);
  return res.rows;
};

module.exports = { createUser, getUser };
