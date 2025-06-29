import { check } from "express-validator";

export const petSchema = [
  check("name").exists().withMessage("El campo nombre es obligatorio"),
  check("genderId").exists().isNumeric().withMessage("El campo genero es obligatorio"),
  check("description").exists().withMessage("El campo descripcion es obligatorio"),
  check("breed").exists().withMessage("El campo raza es obligatorio"),
  check("location").exists().withMessage("El campo ubicacion es obligatorio"),
  check("latitude").exists().withMessage("El campo latitud es obligatorio"),
  check("longitude").exists().withMessage("El campo longitud es obligatorio"),
  check("typeId").exists().isNumeric().withMessage("El campo tipo es obligatorio"),
  check("age").exists().withMessage("El campo edad es obligatorio"),
  check("userId").exists().isNumeric().withMessage("El campo usuario es obligatorio"),
];
