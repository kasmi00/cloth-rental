const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,  // ✅ Ensure this matches your .env variable name
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1)  // ✅ Fixed typo
            return `${Date.now()}-rent-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-rent-${file.originalname}`
        };
    }
});

module.exports = multer({ storage });
