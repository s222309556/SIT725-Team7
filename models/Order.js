//Schema for Order
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  orderName: {
    type: String,
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  deliveryMethod: {
    type: String,
    enum: ["Pickup", "Mail"],
    default: "Mail",
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["On Hold", "Accepted", "Rejected", "Pending", "Completed"],
    required: true,
    default: "On Hold",
  },
  isSenderCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isReceiverCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
