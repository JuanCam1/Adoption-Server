import { check } from "express-validator";

export const loginSchema = [
  check("email").exists().isEmail(),
  check("password").exists().isLength({
    min: 6,
    max: 12,
  }),
];

export const registerSchema = [
  check("name").exists(),
  check("email").exists().isEmail(),
  check("password").exists().isLength({
    min: 6,
    max: 12,
  }),
  check("phone").exists().isNumeric(),
  check("address").exists(),
  check("location").exists(),
  check("description").exists(),
];
