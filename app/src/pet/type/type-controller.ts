import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../util/sendResponse";
import { validateErrorCatch } from "../../../util/validateError";
import { createTypeService, listTypeService, updateTypeService } from "./type-service";

export const createTypeController = async (req: Request, res: Response) => {
  try {
    const type = matchedData<TypeCreatePetModelI>(req);
    const typeCreated = await createTypeService(type);
    sendResponse(res, "success", StatusCodes.OK, "type created", typeCreated);
  } catch (error) {
    validateErrorCatch(res, error);
  }
};

export const updateTypeController = async (req: Request, res: Response) => {
  try {
    const type = matchedData<TypePetModelI>(req);
    const petUpdated = await updateTypeService(type);
    sendResponse(res, "success", StatusCodes.OK, "type updated", petUpdated);
  } catch (error) {
    validateErrorCatch(res, error);
  }
};

export const listTypeController = async (_req: Request, res: Response) => {
  try {
    const listType = await listTypeService();
    sendResponse(res, "success", StatusCodes.OK, "listType", listType);
  } catch (error) {
    validateErrorCatch(res, error);
  }
};
