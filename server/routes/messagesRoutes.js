const {
  createMessage,
  getMessages,
} = require("../controllers/messagesController.js");

const router = require("express").Router();

router.post("/createMessage", createMessage);
router.post("/messages", getMessages);

module.exports = router;
