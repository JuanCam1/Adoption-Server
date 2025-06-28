// import type { NextFunction, Request, Response } from "express";
// import type { TokenData } from "../models/token.model";
// import { sendResponse } from "../util/sendResponse";
// import { StatusCodes } from 'http-status-codes';

// export const hasType = (types: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // Obtiene el encabezado
//       const dataHeader = req.header("x-user-data");

//       if (!dataHeader) {
//         return sendResponse(res, "error", StatusCodes.FORBIDDEN, "Error in authentication: Header missing", null);
//       }

//       // Parsea el encabezado
//       let payload: TokenData;
//       try {
//         payload = JSON.parse(dataHeader);
//       } catch (_err) {
//         return sendResponse(res, "error", StatusCodes.FORBIDDEN, "Error in authentication: Invalid header format", null);
//       }

//       // Validación básica del payload
//       if (!payload.rol || typeof payload.rol !== "string" || payload.rol.trim() === "") {
//         return sendResponse(res, "error", StatusCodes.FORBIDDEN, "Error in authentication: Invalid role", null);
//       }

//       const isAuthorized = types.includes(payload.rol);

//       if (isAuthorized) {
//         return next(); // Si está autorizado, continúa
//       }
//       return sendResponse(res, "error", StatusCodes.UNAUTHORIZED, "User is not authorized to perform this action", null);
//     } catch (err) {
//       return sendResponse(res, "error", StatusCodes.INTERNAL_SERVER_ERROR, "Unexpected server error", null);
//     }
//   };
// };