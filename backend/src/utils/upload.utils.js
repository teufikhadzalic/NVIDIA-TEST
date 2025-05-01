const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Konfigurasi Cloudinary
cloudinary.config({
    cloud_name: "dwcxftbeh",
    api_key: "535283632553928",
    api_secret: "87LIhDsjG5cTUuqztnSooli-AFA"
  });
  
// Konfigurasi multer untuk menyimpan file di disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        
        
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Fungsi untuk mengunggah file ke Cloudinary
const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder: folder });
        fs.unlinkSync(filePath); // Hapus file setelah diunggah
        return result;
    } catch (error) {
        console.error("Upload ke Cloudinary gagal:", error);
        throw error;
    }
};

// Ekspor modul dalam satu objek
module.exports = { upload, uploadToCloudinary };
