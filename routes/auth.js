const express = require("express");
// const { registerUser } = require("../handlers/auth-handler");
const { createUser, loginUser } = require("../controllers/user.controller");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/'})

router.post("/register", upload.single('userImage'), async (req, res) => {
    // let model = req.body; 
    if (req.body.firstName && req.body.lastName && req.body.password && req.body.email && req.body.phone && req.file && req.body.address && req.body.gender) {
        await createUser(req, res);
        res.status(200).json({
            message: "User has been registered!"
        });
    }  else {
        res.status(400).json({
            error: "Please provide complete user details!"
        });
    }
});

router.post("/login", async (req, res) => {
    // let model = req.body; 
    if ( req.body.password && req.body.email ) {
        // login
        const result = await loginUser(req, res);
        if(result) {
            res.send(result);
        } else {
            res.status(400).json({
                error: "Email or Password is incorrect"
            });
        }
    }  else {
        res.status(400).json({
            error: "Please provide email and password!"
        });
    }
});
module.exports = router;

