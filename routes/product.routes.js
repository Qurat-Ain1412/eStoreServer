const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/add", upload.single("image"), productController.createProduct);
router.get("/list", productController.getProducts);
router.get("/:id", productController.getProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.put(
  "/update/:id",
  upload.single("image"),
  productController.updateProduct
);

module.exports = router;
