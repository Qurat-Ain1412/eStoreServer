require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const mongoURI = process.env.URI;
if (!mongoURI) {
  console.error("MongoDB URI is missing in .env file");
  process.exit(1);
}

const client = new MongoClient(mongoURI);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongoose connected successfully"))
  .catch(err => console.error("Mongoose connection error:", err));

async function connectDB() {
    try {
      await client.connect();
      console.log("Connected to MongoDB!");
      const db = client.db("eStore");
      const collection = db.collection("users");
    } catch (err) {
      console.error("MongoClient connection error:", err);
    } finally {
      await client.close();
    } 
}

connectDB();

// Test route for root path
app.get("/", (req, res) => {
  res.json({
    message: "API is working!",
    status: "success",
    data: {
      service: "eStore API",
      version: "1.0",
      timestamp: new Date().toISOString()
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
  console.log(`Test the API at http://localhost:${PORT}/`);
});