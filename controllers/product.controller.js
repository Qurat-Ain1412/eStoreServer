const productService = require('../services/product.service.js');


const createProduct = async(req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: error});
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
        res.status(201).json(product);
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