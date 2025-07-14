import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";
import type { StateValue } from "../../conts/state-const";
import { deleteImage } from "../../util/delete-image";
import { sendResponse } from "../../util/sendResponse";
import { validateErrorCatch } from "../../util/validateError";
import { stateAccountService, updateUserService } from "./user-service";

export const updateUserController = async (req: Request, res: Response) => {
	try {
		const user = matchedData<UserModelI>(req);
		const userDb = await updateUserService(user);
		sendResponse(res, "success", StatusCodes.OK, "Update user", userDb);
	} catch (error) {
		if (req.file) deleteImage(req.file?.filename, "user");
		validateErrorCatch(res, req, error);
	}
};

export const stateAcountController = async (req: Request, res: Response) => {
	try {
		const { id, type } = matchedData<{ id: string; type: StateValue }>(req);
		const user = await stateAccountService(id, type);
		sendResponse(
			res,
			"success",
			StatusCodes.OK,
			"Se ha actualizado el estado de la cuenta",
			user,
		);
	} catch (error) {
		validateErrorCatch(res, req, error);
	}
};
