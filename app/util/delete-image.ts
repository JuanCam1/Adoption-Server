import fs from "node:fs";
import path from "node:path";
import { PathConst } from "../conts/path-const";

type DeleteImageType = "user" | "pet";

export const deleteImage = (filename: string, type: DeleteImageType) => {
  const typeValue = type === "user" ? PathConst.destinationUser : PathConst.destinationPet;

  const imagePath = path.join(__dirname, typeValue, filename);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('Error al eliminar la imagen:', err);
    } else {
      console.log('Imagen eliminada correctamente');
    }
  });
};