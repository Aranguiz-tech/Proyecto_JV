"use strict";
import { Router } from "express";

import authRoute from "./auth.route.js";         
import userRoute from "./user.route.js";
import hogarRoute from "./hogar.route.js"; 
import ReunionRoute from "./reunion.route.js";
import solicitudRoute from "./Solicitud.route.js";

const router = Router();

router.use("/auth", authRoute);                 
router.use("/usuario", userRoute);
router.use("/hogar", hogarRoute); 
router.use("/reunion", ReunionRoute);
router.use("/solicitud", solicitudRoute);

export default router;
