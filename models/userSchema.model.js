const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Enter your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Enter your last name"],
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  userImage: {
    type: String
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
