import { Router } from "express";
import userRoute from "./user.route.js";

const router = Router();


router.use("/usuario", userRoute);

export default router;
