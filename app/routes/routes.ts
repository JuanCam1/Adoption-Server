import { Router } from "express";
import authRouter from "../src/auth/auth-routes";
import petRouter from "../src/pet/pet-routes";
import userRouter from "../src/user/user-routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/pet", petRouter);

export default router;
