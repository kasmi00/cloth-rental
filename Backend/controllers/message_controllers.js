const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.status(200).json({ msg: "Message added successfully" });
    } else {
      return res.status(400).json({ msg: "Failed to add message in database" });
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
// get all the message between two users

const allMessage = async (req, res) => {
  try {
    const { from, to } = req.query;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updated: 1 });

    const projectedMessage = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() == from,
        message: msg.message.text,
      };
    });
    return res.status(200).json(projectedMessage);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { sendMessage, allMessage };
