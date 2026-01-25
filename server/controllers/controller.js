const db = require("../db/queries");
const bcryptjs = require("bcryptjs");

const signup = async (req, res) => {
  const { firstName, lastName, email, password, isMember } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    await db.createUser(firstName, lastName, email, hashedPassword, isMember);

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
  const { email, password } = req.body;
  try {
    const resp = await db.getUser(email);
    if (!resp) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log(resp,"33k33")
    const user = resp[0];
    const isAuthenticated = await bcryptjs.compare(password, user.password);

    if (!isAuthenticated) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.session.userId = user.user_id;
    req.session.role = user.is_admin ? "admin" : "member";

    return res.status(200).json({ message: "User logged in" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
