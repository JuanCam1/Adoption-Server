import { check } from "express-validator";

export const changeStateSchema = [
  check("id").exists(),
  check("stateId").exists()
]