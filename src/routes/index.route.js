import { Router } from "express";
import userRoute from "./user.route.js";
import solicitudRoute from "./Solicitud.route.js";

const router = Router();


router.use("/usuario", userRoute);
router.use("/solicitud", solicitudRoute);

export default router;
