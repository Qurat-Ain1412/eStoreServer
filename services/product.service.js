const Product = require("../models/ProductSchema.model.js");

const createProduct = async (productData) => {
  try {
    const product = await Product.create(productData);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProducts = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Error("Product not Found");
    }
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (id, updateData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    console.log("Updated product:", updatedProduct); 

    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
