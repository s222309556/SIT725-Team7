const Message = require("../models/Message");

// @desc    Get  messageByReceiverId
// @route   GET /messages/reciever/:id
// @access  Public
exports.getMessageByReceiverId = async (req, res, next) => {
  try {
    const messages = await Message.find({ receiverId: req.params.id });
    if (!messages) {
      return res
        .status(400)
        .json({ success: false, message: "Messages not found" });
    }
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get  messageBySenderId
// @route   GET /messages/sender/:id
// @access  Public
exports.getMessageBySenderId = async (req, res, next) => {
  try {
    const messages = await Message.find({ senderId: req.params.id });
    if (!messages) {
      return res
        .status(400)
        .json({ success: false, message: "Messages not found" });
    }
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get  createMessage
// @route   POST /messages
// @access  Public
exports.createMessage = async (req, res, next) => {
  try {
    const message = await Message.create(req.body);
    return message;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// @desc    Post  messageHistory by orderId,senderId,receiverId acs order by createdAt
// @route   POST /messages/history
// @access  Public
exports.messageHistory = async (req, res, next) => {
  try {
    const messages = await Message.find({
      orderId: req.body.orderId,
    }).sort({ createdAt: 1 });
    if (!messages) {
      return res
        .status(400)
        .json({ success: false, message: "Messages not found" });
    }
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
