const Product = require("../models/Product");

exports.getAllProducts = async () => {
  try {
    const data = await Product.find();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

exports.getProductById = async (id) => {
  return Product.findById(id);
};

exports.createProduct = async (productData) => {
  const product = new Product(productData);
  return product.save();
};

exports.updateProduct = async (id, productData) => {
  return Product.findByIdAndUpdate(id, productData, { new: true });
};

exports.deleteProduct = async (id) => {
  return Product.findByIdAndDelete(id);
};
