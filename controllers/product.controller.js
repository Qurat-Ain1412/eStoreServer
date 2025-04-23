const productService = require('../services/product.service.js');
const cloudinary = require("../utils/cloudinary.js")
const Product = require('../models/ProductSchema.model.js'); 
const fs = require('fs');

// const createProduct = async (req, res) => {
//     try {
//         if (!req.body.image) {
//             return res.status(400).json({ message: 'No image data provided' });
//         }

//         const result = await cloudinary.uploader.upload(req.body.image, {
//             folder: 'products',
//             // resource_type: 'auto' // Automatically detect image/video/raw
//         });

//         const product = await Product.create({
//             name: req.body.name,
//             price: req.body.price,
//             quantity: req.body.quantity,
//             image: result.secure_url
//         });

//         res.status(201).json(product);
//     } catch (error) {
//         console.error('Upload error:', error);
//         res.status(500).json({ 
//             message: 'Failed to upload product',
//             error: error.message 
//         });
//     }
// };

const createProduct = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
      }
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products' // to specify folder in cloudinary so that we can organize our assets in one foldere there.
      });
  console.log("url:", result);
      // Create product with image URL
      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        image: result.secure_url // URL from Cloudinary
      });
  
      // Delete the temporary file
      fs.unlinkSync(req.file.path);
  
      res.status(201).json(product);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ 
        message: 'Failed to upload product',
        error: error.message 
      });
    }
};
const getProducts = async(req, res) => {
    try {
        const products = await productService.getProducts(req.body);
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({message: error});
    }
};


const getProduct = async(req, res) => {
    try {
        const product = await productService.getProduct(req.params.id);
        console.log(`${req.protocol}://${req.get('host')}/${product.image}`);
        const imageUrl = `${req.protocol}://${req.get('host')}/${product.image}`;
        res.json({ ...product.toObject(), imageUrl });
        // res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: error});
    }
};


const deleteProduct = async(req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message:error});
    }
}


// In your controller
const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(
            req.params.id, 
            req.body
        );
        res.status(200).json(product);
    } catch (error) {
        if (error.message === 'Product not found') {
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
    updateProduct
};