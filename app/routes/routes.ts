import { Router } from "express";
import authRouter from "../src/auth/auth-routes";
import genderRouter from "../src/gender/gender-router";
import petRouter from "../src/pet/pet-routes";
import typeRouter from "../src/type/type-router";
import userRouter from "../src/user/user-routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/pet", petRouter);
router.use("/gender", genderRouter);
router.use("/type", typeRouter);

export default router;
