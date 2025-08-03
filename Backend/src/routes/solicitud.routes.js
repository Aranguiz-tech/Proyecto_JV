import express from "express";
import { 
    createSolicitud,
    deleteSolicitud, 
    getSolicitudes, 
    getSolicitudesPorUser,
    getSolicitudPorId, 
    updateEstadoSolicitud,
    updateSolicitud
} from "../controllers/solicitud.controller.js";
import { uploadFile } from "../middlewares/upload.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
const router = express.Router();



router.post(
  "/",
  authenticateJwt,
  uploadFile.single("archivo"),
  createSolicitud
);

router.get("/usuario", authenticateJwt, getSolicitudesPorUser);
router.get("/:id", getSolicitudPorId);


router.get("/", getSolicitudes);
router.delete("/:id", deleteSolicitud);
router.put("/estado/:id", updateEstadoSolicitud);
router.put("/:id", uploadFile.single("archivo"), updateSolicitud);


export default router;