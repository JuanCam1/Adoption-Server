import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../util/sendResponse";

export const validationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  console.log("validationErrors", errors);
  if (!errors.isEmpty()) {
    sendResponse(
      res,
      "error",
      StatusCodes.BAD_REQUEST,
      "Error de validación",
      null,
    );
    return;
  }
  next();
};
