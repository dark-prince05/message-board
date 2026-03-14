const { Router } = require("express");
const db = require("../db/queries");

const membershipRouter = Router();

membershipRouter.post("/", async (req, res) => {
  const { answer } = req.body;
  if (answer == 14) {
    if (req.session.role == "guest") {
      req.session.role = "member";
      await db.updateRole(req.session.userId);
    }
    res.status(200).json({ message: "Role updated successfully" });
  } else {
    res.status(422).json({ message: "Wrong answer" });
  }
});

module.exports = membershipRouter;
