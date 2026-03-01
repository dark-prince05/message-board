const { Router } = require("express");
const logoutRouter = Router();

logoutRouter.post("/", (req, res) => {
  req.session.destroy((err) => {
    if(err){
      return res.status(500).json({message:"Logout failed"})
    }
  })  
  res.clearCookie("connect.sid");
  return res.status(204).end();
})

module.exports = logoutRouter;
