import { check } from "express-validator";

export const loginSchema = [
  check("email").exists().isEmail().withMessage("El campo email es obligatorio"),
  check("password").exists().isLength({
    min: 6,
    max: 12,
  }).withMessage("La contraseña debe tener entre 6 y 12 caracteres"),
];

export const registerSchema = [
  check("name").exists().notEmpty().withMessage("El campo nombre es obligatorio"),
  check("email").exists().isEmail().withMessage("El campo email es obligatorio"),
  check("password").exists().notEmpty().isLength({
    min: 6,
    max: 12,
  }).withMessage("La contraseña debe tener entre 6 y 12 caracters"),
  check("phone").exists().isInt().withMessage("El campo telefono es obligatorio"),
  check("address").exists().notEmpty().withMessage("El campo direccion es obligatorio"),
  check("location").exists().notEmpty().withMessage("El campo ubicacion es obligatorio"),
  check("description").optional(),
  check("picture").exists().withMessage("La foto es obligatoria"),
];
