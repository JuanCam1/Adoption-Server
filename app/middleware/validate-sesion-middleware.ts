// import { NextFunction, Response } from "express";
// import moment from "moment";
// import jwt from "jsonwebtoken";
// import { CustomRequest } from "./../../types/express/index.d";
// import { TokenData } from "./../models/token.model";

// import { sendErrorResponse } from "./../utils/sendResponse";
// import { config } from "../config/config";

// export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
//   if (!req.headers.authorization) {
//     return sendErrorResponse(res, 403, 101, "Request is missing authorization header");
//   }

//   const token = req.headers.authorization.split(" ")[1];

//   try {
//     const data = jwt.verify(token, config.TOKEN_SECRET) as TokenData;
//     if (!data.exp) return sendErrorResponse(res, 401, 102, "invalided token");

//     if (data.exp <= moment().unix()) {
//       return sendErrorResponse(res, 401, 102, "Expired token");
//     } else {
//       req.payload = data;
//       next();
//     }
//   } catch (err) {
//     return sendErrorResponse(res, 403, 103, `${err}`.substring(7));
//   }
// };