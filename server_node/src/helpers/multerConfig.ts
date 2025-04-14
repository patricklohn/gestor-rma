import multer, { FileFilterCallback } from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";

const tmpFolder = path.resolve(__dirname, "..", "tmp", "uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, tmpFolder);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) return cb(err, "");
  
        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  });
  
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "application/pdf",
      "video/mp4",
    ];
  
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato do arquivo inválido!"));
    }
  };
  
  const upload = multer({
    dest: tmpFolder,
    storage,
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB
    },
    fileFilter,
  });
  
  export default upload;