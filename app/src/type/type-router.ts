import { Router } from "express";
import { validationErrors } from "../../middleware/validation-middleware";
import {
	createTypeController,
	listTypeController,
	updateTypeController,
} from "./type-controller";
import { typeSchema } from "./type-middleware";

const typeRouter = Router();

typeRouter.post("/", typeSchema, validationErrors, createTypeController);

typeRouter.put("/", typeSchema, validationErrors, updateTypeController);

typeRouter.get("/", listTypeController);

export default typeRouter;
