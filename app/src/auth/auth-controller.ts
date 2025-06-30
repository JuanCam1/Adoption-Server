import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { deleteImage } from "../../util/delete-image";
import { sendResponse } from "../../util/sendResponse";
import { validateErrorCatch } from "../../util/validateError";
import { loginService, registerService } from "./auth-service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const login = matchedData<LoginModelI>(req);
    const user = await loginService(login);
    sendResponse(res, "success", StatusCodes.OK, "Login exitoso", user);
  } catch (error) {
    validateErrorCatch(res, error);
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const register = matchedData<RegisterModelI>(req);
    const picture = req?.file;
    const registerFile = { ...register, picture };

    const user = await registerService(registerFile);
    sendResponse(res, "success", StatusCodes.OK, "Registro exitoso", user);
  } catch (error) {
    if (req.file) deleteImage(req.file?.filename, "user");
    validateErrorCatch(res, error);
  }
};
