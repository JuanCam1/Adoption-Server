import { Router } from "express";
import { validationErrors } from "../../middleware/validation-middleware";
import { stateAcountController, updateUserController } from "./user-controller";
import { stateAcountSchema, updateUserSchema } from "./user-middleware";

const userRouter = Router();

userRouter.put("/", updateUserSchema, validationErrors, updateUserController);
userRouter.post("/state", stateAcountSchema, validationErrors, stateAcountController);

export default userRouter;
