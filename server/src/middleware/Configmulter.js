const multer = require('multer');
const path = require('path')

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'uploads')); // Path where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate unique filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;
