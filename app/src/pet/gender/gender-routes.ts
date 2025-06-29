

import { Router } from "express";
import { listGenderController } from "./gender-controller";

const genderRouter = Router();

genderRouter.get("/", listGenderController);

export default genderRouter;