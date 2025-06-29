import { Router } from "express";
import { idSchema } from "../../../middleware/id-middleware";
import { validationErrors } from "../../../middleware/validation-middleware";
import {
  createTypeController,
  listTypeController,
  updateTypeController,
} from "./type-controller";
import { typeSchema } from "./type-middleware";

const typeRouter = Router();

typeRouter.post("/", typeSchema, validationErrors, createTypeController);
typeRouter.put(
  "/",
  idSchema,
  typeSchema,
  validationErrors,
  updateTypeController,
);
typeRouter.get("/", listTypeController);

export default typeRouter;
