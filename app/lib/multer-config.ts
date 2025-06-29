import path from "node:path";
import multer from "multer";

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg",
  ".exe",
  ".msi",
  ".deb",
  ".apk",
  ".ipa",
  ".pkg",
  ".dmg",
];

export const multerConfig = (destination: string) => {
  const storagePhoto = multer.diskStorage({
    destination: destination,
    filename: (_, file, cb) => {
      // console.log("🟡 Archivo recibido en multer:", file);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });

  const upload = multer({
    storage: storagePhoto,
    fileFilter: (_, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (allowedExtensions.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error(`Tipo de archivo no permitido: ${ext}`));
      }
    },
  });

  return upload;
};
