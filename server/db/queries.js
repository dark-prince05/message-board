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
    "INSERT INTO user_details(first_name, last_name, email, password, is_member, is_admin) values ($1, $2, $3, $4, $5, $6) RETURNING *",
    [firstName, lastName, email, password, isMember, isAdmin],
  );
  return res.rows;
};

const getUser = async (email) => {
  const res = await pool.query("SELECT * FROM user_details WHERE email=$1", [
    email,
  ]);
  return res.rows;
};

const createMsg = async (userId, msgTitle, message) => {
  const res = await pool.query(
    "INSERT INTO user_msgs(user_id, msg_title, message) values ($1, $2, $3)",
    [userId, msgTitle, message],
  );
  return res.rowCount;
};

const getAllMessages = async () => {
  const res = await pool.query(`
    SELECT m.msg_id, m.msg_title, m.message, m.created_at, u.user_id, u.first_name, u.last_name, u.email, u.is_admin, u.is_member
    FROM user_msgs m JOIN user_details u ON m.user_id = u.user_id ORDER BY m.created_at DESC
`);
  return res.rows;
};

const updateMsg = async (msgId, msgTitle, message) => {
  const res = await pool.query(
    "UPDATE user_msgs SET msg_title = COALESCE($1, msg_title), message = COALESCE($2, message) WHERE msg_id = $3",
    [msgTitle, message, msgId],
  );
  return res.rowCount;
};

const deleteMsg = async (msgId) => {
  const res = await pool.query("DELETE FROM user_msgs WHERE msg_id = $1", [
    msgId,
  ]);
  return res.rowCount;
};

const updateRole = async (userId) => {
  const res = await pool.query("UPDATE user_details SET is_member = true WHERE user_id = $1", [userId])
  return res.rowCount;
} 

module.exports = { createUser, getUser, createMsg, getAllMessages, updateMsg, deleteMsg, updateRole };
