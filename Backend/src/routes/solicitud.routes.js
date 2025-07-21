import express from "express";
import { 
    createSolicitud,
    deleteSolicitud, 
    getSolicitudes, 
    getSolicitudesPorUsuario, 
    getSolicitudPorId, 
    updateEstadoSolicitud,
    updateSolicitud
} from "../controllers/solicitud.controller.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { isJefeDeHogar } from "../middlewares/authorization.middleware.js";
import { uploadFile } from "../middlewares/upload.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
const router = express.Router();



router.post(
  "/",
  authenticateJwt,
  uploadFile.single("archivo"),
  createSolicitud
);
router.get("/usuario/:usuarioId", getSolicitudesPorUsuario);
router.get("/:id", getSolicitudPorId);
router.get("/", getSolicitudes);
router.delete("/:id", deleteSolicitud);
router.put("/:id", updateSolicitud);
router.put("/estado/:id", updateEstadoSolicitud);

export default router;