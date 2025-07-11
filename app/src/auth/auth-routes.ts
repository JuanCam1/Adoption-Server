import { Router } from "express";
import { multerConfig } from "../../lib/multer-config";
import { validationErrors } from "../../middleware/validation-middleware";
import { loginController, registerController } from "./auth-controller";
import { loginSchema, registerSchema } from "./auth-middleware";

const authRouter = Router();
const upload = multerConfig();

authRouter.post("/login", loginSchema, validationErrors, loginController);

authRouter.post(
  "/register",
  upload.single("picture"),
  registerSchema,
  validationErrors,
  registerController,
);

export default authRouter;
