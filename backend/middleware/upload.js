import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.resolve("public");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure file storage
const storage = multer.diskStorage({

  // Store uploaded files in public folder
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  // Generate unique file name
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },

});

// Upload a single image file
const fileUpload = multer({
  storage,
}).single("image");

export default fileUpload;
