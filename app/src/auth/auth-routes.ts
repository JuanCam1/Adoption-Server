import { Router } from "express";
import { validationErrors } from "../../middleware/validation-middleware";
import { loginController, registerController } from "./auth-controller";
import { loginSchema, registerSchema } from "./auth-middleware";

const authRouter = Router();

authRouter.post("/login", loginSchema, validationErrors, loginController);

authRouter.post(
  "/register",
  registerSchema,
  validationErrors,
  registerController,
);

export default authRouter;
