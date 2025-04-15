require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require('./routes/product.routes');
// const getProductsRoutes = require('./routes/product.routes')

const app = express();
app.use(express.json());
const PORT = 3000;

// Database connection
mongoose.connect(process.env.URI)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch(err => console.error("Mongoose connection error:", err));

// Routes
app.use('/api/products', productRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "API is working!",
    status: "success"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});