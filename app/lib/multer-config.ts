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

export const multerConfig = () => {
	const storagePhoto = multer.memoryStorage();

	const upload = multer({
		limits: {
			fileSize: 5 * 1024 * 1024,
		},
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
