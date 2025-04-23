// middlewares/upload.js
const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'uploads/'); // folder to store images
    // },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1712345678912.png
    }
});

const upload = multer({ storage: storage });

module.exports = upload;