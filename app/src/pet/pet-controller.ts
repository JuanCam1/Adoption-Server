import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { loggerInfo } from "../../lib/logger";
import { deleteImage } from "../../util/delete-image";
import { sendResponse } from "../../util/sendResponse";
import { validateErrorCatch } from "../../util/validateError";
import {
  createPetService,
  deletePetService,
  getByIdPetService,
  listPetByIdUserService,
  listPetService,
  stateChangePetService,
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
    sendResponse(
      res,
      "success",
      StatusCodes.OK,
      "Mascota actualizada",
      petUpdated,
    );
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
    sendResponse(res, "success", StatusCodes.OK, "Lista mascotas", pets);
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
    sendResponse(
      res,
      "success",
      StatusCodes.OK,
      "Lista mascotas por usuario",
      pets,
    );
  } catch (error) {
    validateErrorCatch(res, req, error);
  }
};

export const getByIdPetController = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData<{ id: string }>(req);
    const pet = await getByIdPetService(id);
    sendResponse(res, "success", StatusCodes.OK, "Mascota por id", pet);
  } catch (error) {
    validateErrorCatch(res, req, error);
  }
};

export const stateChangePetController = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData<{ id: string }>(req);
    const pet = await stateChangePetService(id);
    sendResponse(res, "success", StatusCodes.OK, "Mascota actualizada", pet);
  } catch (error) {
    validateErrorCatch(res, req, error);
  }
};

export const deletePetController = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData<{ id: string }>(req);
    const pet = await deletePetService(id);
    sendResponse(res, "success", StatusCodes.OK, "Mascota eliminara", pet);
  } catch (error) {
    validateErrorCatch(res, req, error);
  }
};
