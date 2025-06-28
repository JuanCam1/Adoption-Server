import { check } from "express-validator";

export const idSchema = [check("id").exists()];
