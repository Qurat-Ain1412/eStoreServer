const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/addUser", upload.single("userImage"), userController.createUser);
router.get("/listUser", userController.getUsers);
router.get("/:id", userController.getUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.put(
  "/updateUser/:id",
  upload.single("userImage"),
  userController.updateUser
);

module.exports = router;
