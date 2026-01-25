const { body, validationResult } = require("express-validator");

const passwordMatch = [
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 character long"),

  body("confirmPassword").custom((value, { req }) => {
    if(value !== req.body.password){
      throw new Error("Passwords do not match")
    }
    return true;
  }),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
    })
  }
  next();
}

module.exports = { passwordMatch, validateRequest}
