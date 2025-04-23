require("dotenv").config();
const express = require("express");
var cors = require('cors');
const mongoose = require("mongoose");
const productRoutes = require('./routes/product.routes');
// const getProductsRoutes = require('./routes/product.routes')


const bodyParser = require('body-parser');

const app = express();

// 🛠 Increase body size limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors());
// const app = express();
app.use('/uploads', express.static('uploads'));
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200'
  // origin: 'http://localhost:4200' (or)
  // origin: '*'
}));
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