import { Router } from "express";
import authRouter from "../src/auth/auth-routes";

const router = Router();

router.use("/auth", authRouter);

export default router;
