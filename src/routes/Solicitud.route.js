import express from "express";
import { createSolicitud, getSolicitudPorid, getSolicitudes, deleteSolicitud, updateSolicitud, updateEstadoSolicitud } from "../controllers/SolicitarDoc.controller.js";

const router = express.Router();

router.post("/", createSolicitud);
router.get("/:id", getSolicitudPorid);
router.get("/", getSolicitudes);
router.delete("/:id", deleteSolicitud);
router.put("/:id", updateSolicitud);
router.put("/estado/:id", updateEstadoSolicitud);

export default router;