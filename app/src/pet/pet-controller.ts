import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { loggerInfo } from "../../lib/logger";
import { deleteImage } from "../../util/delete-image";
import { sendResponse } from "../../util/sendResponse";
import { validateErrorCatch } from "../../util/validateError";
import {
  createPetService,
  listPetService,
  updatePetService,
} from "./pet-service";

export const createPetController = async (req: Request, res: Response) => {
  try {
    const pet = matchedData<PetModelI>(req);
    const picture = req?.file;
    const petFile = { ...pet, picture };
    const petCreated = await createPetService(petFile);
    sendResponse(res, "success", StatusCodes.OK, "Mascota creada", petCreated);
    loggerInfo("Mascota creada", req, null);
  } catch (error) {
    if (req.file) deleteImage(req.file?.filename, "pet");
    validateErrorCatch(res, req, error);
  }
};

export const updatePetController = async (req: Request, res: Response) => {
  try {
    const pet = matchedData<PetUpdateModelI>(req);
    const picture = req?.file;
    const petFile = { ...pet, picture };

    const petUpdated = await updatePetService(petFile);
    sendResponse(res, "success", StatusCodes.OK, "pet updated", petUpdated);
  } catch (error) {
    if (req.file) deleteImage(req.file?.filename, "pet");
    validateErrorCatch(res, req, error);
  }
};

export const listPetController = async (req: Request, res: Response) => {
  try {
    const query = matchedData<PetListModelI>(req);
    const pets = await listPetService(query);
    sendResponse(res, "success", StatusCodes.OK, "listPet", pets);
  } catch (error) {
    validateErrorCatch(res, req, error);
  }
};

export const listPetByIdUserController = async (
  req: Request,
  res: Response,
) => { };
// export const statePetController = async (req: Request, res: Response) => { };
// export const getPetByIdController = async (req: Request, res: Response) => { };
