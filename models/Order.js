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
    enum: ["Pickup", "Delivery"],
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed"],
    required: true,
    default: "Pending",
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
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
