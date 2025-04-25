const productService = require("../services/product.service.js");
const cloudinary = require("../utils/cloudinary.js");
const Product = require("../models/ProductSchema.model.js");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });
    console.log("url:", result);
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      image: result.secure_url,
    });

    fs.unlinkSync(req.file.path);

    res.status(201).json(product);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Failed to upload product",
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.body);
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id);
    console.log(`${req.protocol}://${req.get("host")}/${product.image}`);
    const imageUrl = `${req.protocol}://${req.get("host")}/${product.image}`;
    res.json({ ...product.toObject(), imageUrl });
    // res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      updateData.image = result.secure_url;
    }

    const product = await productService.updateProduct(
      req.params.id,
      updateData
    );

    res.status(200).json(product);
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
