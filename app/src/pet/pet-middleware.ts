import { check, query } from "express-validator";

export const petSchema = [
  check("name").exists().withMessage("El campo nombre es obligatorio"),
  check("genderId").exists().isInt().withMessage("El campo genero es obligatorio"),
  check("description").exists().withMessage("El campo descripcion es obligatorio"),
  check("breed").exists().withMessage("El campo raza es obligatorio"),
  check("location").exists().withMessage("El campo ubicacion es obligatorio"),
  check("typeId").exists().isInt().withMessage("El campo tipo es obligatorio"),
  check("age").exists().withMessage("El campo edad es obligatorio"),
  check("userId").exists().withMessage("El campo usuario es obligatorio"),
];

export const listQueryPetsSchema = [
  query('page').isInt({ min: 1 }).withMessage('La página debe ser un número mayor a 0'),
  query('limit').optional().isInt({ min: 1 }).withMessage('El límite debe ser un número mayor a 0'),
  query('typeId').optional().isInt().withMessage('typeId debe ser un número'),
  query('genderId').optional().isInt().withMessage('genderId debe ser un número'),
  query('state').optional().isString().isIn(['AVAILABLE', 'ADOPTED', 'IN_PROCESS']).withMessage('Estado inválido'),
  query('location').optional().isString(),
  query('age').optional().isString(),
  query('breed').optional().isString(),
  query('startDate').optional().isISO8601().toDate().withMessage('startDate debe ser una fecha válida'),
  query('endDate').optional().isISO8601().toDate().withMessage('endDate debe ser una fecha válida'),
];
