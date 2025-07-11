import { Router } from "express";
import { multerConfig } from "../../lib/multer-config";
import { idSchema } from "../../middleware/id-middleware";
import { validationErrors } from "../../middleware/validation-middleware";
import genderRouter from "./gender/gender-routes";
import {
  createPetController,
  getByIdPetController,
  listPetByIdUserController,
  listPetController,
  stateChangePetController,
  updatePetController,
} from "./pet-controller";
import {
  listPetByIdUserSchema,
  listQueryPetsSchema,
  petSchema,
} from "./pet-middleware";
import typeRouter from "./type/type-routes";

const upload = multerConfig();
const petRouter = Router();

petRouter.post(
  "/",
  upload.single("picture"),
  petSchema,
  validationErrors,
  createPetController,
);

petRouter.put(
  "/",
  upload.single("picture"),
  idSchema,
  petSchema,
  validationErrors,
  updatePetController,
);

petRouter.get("/", listQueryPetsSchema, validationErrors, listPetController);

petRouter.get(
  "/:id",
  idSchema,
  listPetByIdUserSchema,
  validationErrors,
  listPetByIdUserController,
);

petRouter.get("/by-id/:id", idSchema, validationErrors, getByIdPetController);

petRouter.get(
  "/state/:id",
  idSchema,
  validationErrors,
  stateChangePetController,
);

petRouter.use("/gender", genderRouter);
petRouter.use("/type", typeRouter);

export default petRouter;
