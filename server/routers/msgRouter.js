const { Router } = require("express");
const { getMessages, createMessage, updateMessage, deleteMessage } = require("../controllers/msgController");

const msgRouter = Router();

msgRouter.get("/all", getMessages);
msgRouter.post("/create", createMessage);
msgRouter.patch("/update/:messageId", updateMessage);
msgRouter.delete("/delete/:messageId", deleteMessage);

module.exports = msgRouter;
