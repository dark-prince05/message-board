const { Router } = require("express");
const { signup, login } = require("../controllers/controller");
const { passwordMatch, validateRequest } = require("../utils/passwordMatch");

const router = Router();

router.post("/sign-up", passwordMatch, validateRequest, signup);
router.post("/login", login);

module.exports = router;
