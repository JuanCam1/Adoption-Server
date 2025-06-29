import { Router } from "express";
import {
  builderById,
  changeBuilderState,
  createMultipleBuilder,
  createUniqueBuilder,
  deleteBuilder,
  getBuilders,
  updateBuilder
} from "./builder-controller";
import { builderStateSchema, createMultipleBuilderSchema, createUniqueBuilderSchema } from "./builder-middleware";
import { validationErrors } from "../../middleware/validation-middleware";
import { idSchema } from "../../middleware/id-middleware";
import { changeStateSchema } from "../../middleware/change-state-middleware";

const builderRouter = Router();

builderRouter.get("/:state", builderStateSchema, validationErrors, getBuilders);
builderRouter.post("/", createUniqueBuilderSchema, validationErrors, createUniqueBuilder);
builderRouter.post("/multiple", createMultipleBuilderSchema, validationErrors, createMultipleBuilder);
builderRouter.post("/change", changeStateSchema, validationErrors, changeBuilderState);
builderRouter.delete("/:id", idSchema, validationErrors, deleteBuilder);
builderRouter.put("/", updateBuilder);
builderRouter.get("/byId/:id", idSchema, validationErrors, builderById);

export default builderRouter;