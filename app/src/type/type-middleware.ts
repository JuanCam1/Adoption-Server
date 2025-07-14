import { check } from "express-validator";

export const typeSchema = [
  check("type").exists().withMessage("El campo tipo es obligatorio"),
];
