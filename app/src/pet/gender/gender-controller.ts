import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../util/sendResponse";
import { validateErrorCatch } from "../../../util/validateError";
import { listGenderService } from "./gender-service";

export const listGenderController = async (_req: Request, res: Response) => {
  try {
    const listGender = await listGenderService();
    sendResponse(res, "success", StatusCodes.OK, "listGender", listGender);
  } catch (error) {
    validateErrorCatch(res, error);
  }
};
