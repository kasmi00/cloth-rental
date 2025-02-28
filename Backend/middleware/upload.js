const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

// Setup GridFS storage
const storage = new GridFsStorage({
    url: process.env.MONGO_URI, // Ensure this is set in your .env file
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        // If file type doesn't match, return a unique filename
        if (!match.includes(file.mimetype)) {
            return {
                bucketName: "photos",
                filename: `${Date.now()}-rent-${file.originalname}`
            };
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-rent-${file.originalname}`
        };
    }
});

module.exports = multer({ storage });
