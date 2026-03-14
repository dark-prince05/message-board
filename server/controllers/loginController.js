const db = require("../db/queries");
const bcryptjs = require("bcryptjs");

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await db.createUser(firstName, lastName, email, hashedPassword);

    req.session.userId = user[0].user_id;
    req.session.role = user[0].is_admin
      ? "admin"
      : user[0].is_member
        ? "member"
        : "guest";

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (e) {
    if (e.code == "23505") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    console.log("Error creating user");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    if(!email.includes("@")){
      email += '@gmail.com'
    }
    const resp = await db.getUser(email);
    if (!resp || resp.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = resp[0];
    const isAuthenticated = await bcryptjs.compare(password, user.password);

    if (!isAuthenticated) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.session.userId = user.user_id;
    req.session.role = user.is_admin
      ? "admin"
      : user.is_member
        ? "member"
        : "guest";

    return res.status(200).json({ message: "User logged in" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const whoAmI = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({
      authenticated: false,
      message: "You are not authenticated"
    });
  }
  return res.status(200).json({
    authenticated: true,
    userId: req.session.userId,
    role: req.session.role,
  });
};

module.exports = { signup, login, whoAmI};
