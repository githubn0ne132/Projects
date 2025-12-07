const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile } = require('../controllers/uploadController');
const { authMiddleware } = require('../middleware/authMiddleware');
const path = require('path');
require('dotenv').config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH || 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 }
});

router.post('/', authMiddleware, upload.single('file'), uploadFile);

module.exports = router;
