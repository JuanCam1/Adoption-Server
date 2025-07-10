import fs from "node:fs";
import path from "node:path";
import { PathConst } from "../conts/path-const";

type DeleteImageType = "user" | "pet";

export const deleteImage = (filename: string, type: DeleteImageType) => {
  console.log("Eliminando imagen:", filename, type);
  if (!filename || typeof filename !== "string") {
    console.error("Nombre de archivo no válido:", filename);
    return;
  }

  const typeValue = type === "user" ? PathConst.destinationUser : PathConst.destinationPet;

  if (!typeValue || typeof typeValue !== "string") {
    console.error("Ruta de tipo no válida:", typeValue);
    return;
  }

  const imagePath = path.join(__dirname, typeValue, filename);

  fs.unlinkSync(imagePath);
};
