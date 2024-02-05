const Order = require("../models/Order");

exports.getAllOrders = async () => {
  return Order.find();
};

exports.getOrderById = async (id) => {
  return Order.findById(id);
};

exports.getOrderByEmail = async (email) => {
  const orders = await Order.aggregate([{ $match: { customer_email: email } }]);

  if (!orders || orders.length === 0) {
    return {
      message: "No orders found for the given email",
      status: "error",
    };
  }
  return orders;
};

exports.createOrder = async (productData) => {
  const order = new Order(productData);
  return order.save();
};

exports.updateOrder = async (id, orderData) => {
  return Order.findByIdAndUpdate(id, orderData, { new: true });
};

exports.deleteOrder = async (id) => {
  return Order.findByIdAndDelete(id);
};
