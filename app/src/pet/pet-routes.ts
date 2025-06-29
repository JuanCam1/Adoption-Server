import { Router } from "express";
import { PathConst } from "../../conts/path-const";
import { multerConfig } from "../../lib/multer-config";
import { idSchema } from "../../middleware/id-middleware";
import { validationErrors } from "../../middleware/validation-middleware";
import { createPetController, updatePetController } from "./pet-controller";
import { petSchema } from "./pet-middleware";

const upload = multerConfig(PathConst.destinationPet);
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

export default petRouter;
