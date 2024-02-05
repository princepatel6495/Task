const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: String, required: true },
  Stock: { type: String, required: true },
  Image: { type: String, required: true },
});

module.exports = mongoose.model("products", productSchema);
