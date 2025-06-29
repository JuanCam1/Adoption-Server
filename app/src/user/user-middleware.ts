import { check } from "express-validator";
import { StateValue } from "../../conts/state-const";

export const updateUserSchema = [
  check("id").exists().withMessage("El campo id es obligatorio"),
  check("name").exists().withMessage("El campo nombre es obligatorio"),
  check("email").exists().withMessage("El campo email es obligatorio"),
  check("phone").exists().withMessage("El campo telefono es obligatorio"),
  check("address").exists().withMessage("El campo direccion es obligatorio"),
  check("location").exists().withMessage("El campo ubicacion es obligatorio"),
  check("description").exists().withMessage("El campo descripcion es obligatorio")
]

export const stateAcountSchema = [
  check("id").exists(),
  check("type").isIn([StateValue.ACTIVE, StateValue.INACTIVE]).withMessage("El estado debe ser ACTIVE o INACTIVE")
]