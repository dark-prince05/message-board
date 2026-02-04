const { Router } = require("express");
const { signup, login, whoAmI } = require("../controllers/loginController");
const { passwordMatch, validateRequest } = require("../utils/passwordMatch");

const loginRouter = Router();

loginRouter.post("/sign-up", passwordMatch, validateRequest, signup);
loginRouter.post("/login", login);
loginRouter.get("/me", whoAmI);

module.exports = loginRouter;
