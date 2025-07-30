"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import reunionRoutes from "./reunion.routes.js";
import solicitudRoutes from "./solicitud.routes.js";
import hogarRoutes from "./hogar.routes.js";
import asistenciaRoutes from "./asistencia.routes.js";
import actaRoutes from "./acta.routes.js";

const router = Router();

router
    .use("/asistencia", asistenciaRoutes)
    .use("/auth", authRoutes)
    .use("/usuario", userRoutes)
    .use("/hogar", hogarRoutes)
    .use("/reunion", reunionRoutes)
    .use("/solicitud", solicitudRoutes)
    .use("/acta", actaRoutes);

export default router;