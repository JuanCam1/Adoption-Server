import type { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

import {
  createUniqueBuilderService,
  getBuildersService,
  builderByIdService,
  changeBuilderStateService,
  deleteBuilderService,
  updateBuilderService,
  createMultipleBuilderService
} from "./builder-service";
import { sendResponse } from "../../util/sendResponse";
import { matchedData } from "express-validator";
import { validateErrorCatch } from "../../util/validateError";

export const getBuilders = async (req: Request, res: Response) => {
  try {
    const { state } = matchedData<{ state: StateTypeModelI }>(req);

    const builders = await getBuildersService(state);
    sendResponse<BuilderResModelI[]>(res, "success", StatusCodes.OK, "getAllBuilders", builders);
  } catch (error) {
    validateErrorCatch(res, error);
  }
};

export const createUniqueBuilder = async (req: Request, res: Response) => {
  try {
    const { name, stateId } = matchedData<{ name: string, stateId: number }>(req);
    const builders = await createUniqueBuilderService(name, stateId);
    sendResponse(res, "success", StatusCodes.OK, "Se ha creado el builder", builders);
  } catch (error) {
    validateErrorCatch(res, error);
  }
}

export const createMultipleBuilder = async (req: Request, res: Response) => {
  try {
    const builders = matchedData<MultipleModelI>(req);
    const buildersCreated = await createMultipleBuilderService(builders);
    sendResponse(res, "success", StatusCodes.OK, "Se han creado los builders", buildersCreated);
  } catch (error) {
    validateErrorCatch(res, error);
  }
}

export const changeBuilderState = async (req: Request, res: Response) => {
  try {
    const { id, stateId } = matchedData<{ id: number, stateId: number }>(req);
    const builders = await changeBuilderStateService(id, stateId);
    sendResponse(res, "success", StatusCodes.OK, "Se ha cambiado el estado del builder", builders);
  } catch (error) {
    validateErrorCatch(res, error);
  }
}

export const deleteBuilder = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData<{ id: number }>(req);
    const builders = await deleteBuilderService(id);
    sendResponse(res, "success", StatusCodes.OK, "Se ha eliminado el builder", builders);
  } catch (error) {
    validateErrorCatch(res, error);
  }
}

export const builderById = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData<{ id: number }>(req);
    const builders = await builderByIdService(id);
    sendResponse(res, "success", StatusCodes.OK, "Se ha obtenido el builder", builders);
  } catch (error) {
    validateErrorCatch(res, error);
  }
}

export const updateBuilder = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData<{ id: number }>(req);
    const builders = await updateBuilderService(id);
    sendResponse(res, "success", StatusCodes.OK, "Se ha actualizado el builder", builders);
  } catch (error) {
    validateErrorCatch(res, error);
  }
}
