import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import type { Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from "./sendResponse";
import { NotFoundError } from "../error/not-found-error";
import { ValidationError } from "../error/validate-error";

export const validateErrorCatch = (res: Response, error: unknown) => {
  console.log("✖️", error);

  if (error instanceof NotFoundError) {
    return sendResponse(
      res,
      "error",
      StatusCodes.NOT_FOUND,
      error.message,
      null,
    );
  }

  if (error instanceof ValidationError) {
    return sendResponse(
      res,
      "error",
      StatusCodes.BAD_REQUEST,
      "Error de validación",
      error.details,
    );
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return sendResponse(
        res,
        "error",
        StatusCodes.CONFLICT,
        "Violación de unicidad en la base de datos",
        null,
      );
    }
    if (error.code === "P2025") {
      return sendResponse(
        res,
        "error",
        StatusCodes.NOT_FOUND,
        "Registro no encontrado",
        null,
      );
    }
    return sendResponse(
      res,
      "error",
      StatusCodes.BAD_REQUEST,
      "Error conocido en la base de datos",
      null,
    );
  }

  if (error instanceof PrismaClientValidationError) {
    return sendResponse(
      res,
      "error",
      StatusCodes.BAD_REQUEST,
      "Error de validación en la consulta de base de datos",
      null,
    );
  }

  if (error instanceof PrismaClientInitializationError) {
    return sendResponse(
      res,
      "error",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error al conectar con la base de datos",
      null,
    );
  }

  if (error instanceof PrismaClientRustPanicError) {
    return sendResponse(
      res,
      "error",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error en el motor de base de datos",
      null,
    );
  }


  return sendResponse(
    res,
    "error",
    StatusCodes.INTERNAL_SERVER_ERROR,
    "Error server",
    null,
  );
};
