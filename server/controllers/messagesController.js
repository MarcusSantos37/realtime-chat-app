const messagesModel = require("../model/messagesModel.js");

module.exports.createMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messagesModel.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ success: true, message: "Message sent succesfully." });
    }

    return res.json({ success: false, message: "Failed to send message." });
  } catch (err) {
    next(err);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messagesModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const projectMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      };
    });

    res.json(projectMessages);
  } catch (err) {
    next(err);
  }
};
