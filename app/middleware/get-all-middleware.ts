import { check } from "express-validator";

export const getAllDto = [
  check("page").optional(),
  check("pageSize").optional(),
  check("filter").optional(),
];