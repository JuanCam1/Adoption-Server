import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { loggerInfo } from "../../lib/logger";
import { deleteImage } from "../../util/delete-image";
import { sendResponse } from "../../util/sendResponse";
import { validateErrorCatch } from "../../util/validateError";
import {
  createPetService,
  getByIdPetService,
  listPetByIdUserService,
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
    return;
  } catch (error) {
    console.log("Error Catch", error);

    if (req.file?.filename) {
      deleteImage(req.file.filename, "pet");
    }

    if (!res.headersSent) {
      validateErrorCatch(res, req, error);
      return;
    }
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
    try {
      if (req.file?.filename) {
        deleteImage(req.file.filename, "pet");
      }
    } catch (imgError) {
      console.error("Error al eliminar la imagen:", imgError);
    }
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
) => {
  try {
    const query = matchedData<PetListIdUserModelI>(req);
    const pets = await listPetByIdUserService(query);
    sendResponse(res, "success", StatusCodes.OK, "listPetByIdUser", pets);
  } catch (error) {
    validateErrorCatch(res, req, error);
  }
};

export const getByIdPetController = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData<{ id: string }>(req);
    const pets = await getByIdPetService(id);
    sendResponse(res, "success", StatusCodes.OK, "getByIdPet", pets);
  } catch (error) {
    validateErrorCatch(res, req, error);
  }
};
// export const statePetController = async (req: Request, res: Response) => { };
