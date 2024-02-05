const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  customer_phone_number: { type: String, required: true },
  customer_address: { type: String, required: true },
  customer_city: { type: String, required: true },
  customer_state: { type: String, required: true },
  customer_zip_code: { type: String, required: true },
  orders: [
    {
      productId: { type: mongoose.Types.ObjectId, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered"],
        default: "Pending",
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
