const userService = require("../services/user.service.js");
const cloudinary = require("../utils/cloudinary.js");
const User = require("../models/userSchema.model.js");
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken"); 

const createUser = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "users",
    });
    console.log("url:", result);
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashPassword,
      email: req.body.email,
      phone: req.body.phone,
      userImage: result.secure_url,
      address: req.body.address,
      gender: req.body.gender,
      role: "user",
    });

    fs.unlinkSync(req.file.path);

    res.status(201).json(user);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Failed to enter user",
      error: error.message,
    });
  }
};

//login functionality
const loginUser = async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(!user) {
    return null;
  }
  const isMatched = await bcrypt.compare(req.body.password, user.password);
  if(isMatched) {
    const token = jwt.sign({
      id: user._id, 
      name: user.name, 
      email: user.email
    }, "mySecretToken", 
  {
    expiresIn: "1h"
  });
  return{ token, user};

  } else {
    return null;
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers(req.body);
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getProduct(req.params.id);
    console.log(`${req.protocol}://${req.get("host")}/${user.image}`);
    const imageUrl = `${req.protocol}://${req.get("host")}/${user.image}`;
    res.json({ ...user.toObject(), imageUrl });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      // password: req.body.
      email: req.body.email,
      phone: req.body.phone,
      userImage: result.secure_url,
      address: req.body.address,
      gender: req.body.gender,
      role: "user",
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
      });
      updateData.image = result.secure_url;
    }

    const user = await userService.updateUser(req.params.id, updateData);

    res.status(200).json(user);
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
};
