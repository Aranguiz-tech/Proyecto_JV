"use strict";
import { Router } from "express";
import {
  createAsistencia,
  getAllAsistencias,
  getAsistencia,
  getAsistenciasPorReunion,
  getAsistenciasPorHogar
} from "../controllers/asistencia.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get("/", getAllAsistencias);
router.get("/:id", getAsistencia);
router.get("/reunion/:reunionId", getAsistenciasPorReunion);
router.get("/hogar/:hogarId", getAsistenciasPorHogar);

router.use(authenticateJwt);

router.post("/", isAdmin, createAsistencia);

export default router;
