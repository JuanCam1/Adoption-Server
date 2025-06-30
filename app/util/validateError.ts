import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InactiveUserError } from "../error/inactive-user-error";
import { NotFoundError } from "../error/not-found-error";
import { UnauthorizedError } from "../error/un-authorized-error";
import { ValidationError } from "../error/validate-error";
import { currentDate, currentDateAndHour } from "../lib/current-date-hour";
import { loggerAdmin } from "../lib/logger";
import { sendResponse } from "./sendResponse";

export const validateErrorCatch = (
  res: Response,
  req: Request,
  error: unknown,
) => {
  const { fecha, hora } = currentDateAndHour(currentDate());
  const errorMessage =
    error instanceof Error ? error.message : "Error desconocido";

  loggerAdmin.error(
    JSON.stringify({
      fecha,
      hora,
      verb: req.method,
      path: req.baseUrl + req.path,
      error: errorMessage,
    }),
  );

  if (error instanceof NotFoundError) {
    return sendResponse(
      res,
      "error",
      StatusCodes.NOT_FOUND,
      error.message,
      null,
    );
  }

  if (error instanceof InactiveUserError) {
    return sendResponse(
      res,
      "error",
      StatusCodes.BAD_REQUEST,
      error.message,
      null,
    );
  }

  if (error instanceof UnauthorizedError) {
    return sendResponse(
      res,
      "error",
      StatusCodes.UNAUTHORIZED,
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
