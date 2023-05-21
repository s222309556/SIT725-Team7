//controller for Order
const Order = require("../models/Order");

// @desc    Get all orders
// @route   GET /orders
// @access  Public
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get order by id
// @route   GET /orders/:id
// @access  Public
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get order by buyer id
// @route   GET /orders/buyer/:id
// @access  Public
exports.getOrdersByBuyerId = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyerId: req.params.id });
    if (!orders) {
      return res
        .status(400)
        .json({ success: false, message: "Orders not found" });
    }
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get order by seller id
// @route   GET /orders/seller/:id
// @access  Public
exports.getOrdersBySellerId = async (req, res, next) => {
  try {
    const orders = await Order.find({ sellerId: req.params.id });
    if (!orders) {
      return res
        .status(400)
        .json({ success: false, message: "Orders not found" });
    }
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create new order
// @route   POST /orders
// @access  Public
exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update order
// @route   PUT /orders/:id
// @access  Public
exports.updateOrder = async (req, res, next) => {
  try {
    const updateOrder = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateOrder) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: updateOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
