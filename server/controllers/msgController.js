const db = require("../db/queries");

const createMessage = async (req, res) => {
  const { msgTitle, message } = req.body;
  try {
    await db.createMsg(56, msgTitle, message);

    return res.status(201).json({
      message: "Message created successfully",
    });
  } catch (e) {
    console.log("Error creating message");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const msgs = await db.getAllMessages();
    return res.status(200).json({
      msgs,
      message: "Messages fetched successfully",
    });
  } catch (e) {
    console.log("Error getting messages");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateMessage = async (req, res) => {
  const { title, message } = req.body;
  const { messageId } = req.params;
  try {
    await db.updateMsg(messageId, title, message);

    console.log("message updated successfully");
    return res.status(200).json({
      message: "Message updated successfully",
    });
  } catch (e) {
    console.log("Error updating message");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    await db.deleteMsg(messageId);

    console.log("message deleted successfully");
    return res.status(204).json({
      message: "Message deleted successfully",
    });
  } catch (e) {
    console.log("Error deleting message");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getMessages, createMessage, updateMessage, deleteMessage };
