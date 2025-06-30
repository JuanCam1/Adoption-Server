import sharp from "sharp";

export const sharpFile = async (file: Express.Multer.File, pathPicture: string) => {

  const value = pathPicture.includes("user") ? 300 : 500;

  await sharp(file.buffer)
    .resize(value, value, { fit: "inside" })
    .jpeg({ quality: 70 })
    .toFile(pathPicture);
}