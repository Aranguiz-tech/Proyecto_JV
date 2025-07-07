"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import reunionRoutes from "./reunion.routes.js";
import solicitudRoutes from "./solicitud.routes.js";
import hogarRoutes from "./hogar.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/usuario", userRoutes)
    .use("/hogar", hogarRoutes)
    .use("/reunion", reunionRoutes)
    .use("/solicitud", solicitudRoutes);

export default router;