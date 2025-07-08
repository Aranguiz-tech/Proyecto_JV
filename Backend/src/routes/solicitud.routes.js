import express from "express";
import { 
    createSolicitud,
    deleteSolicitud, 
    getSolicitudes,  
    getSolicitudPorId, 
    updateEstadoSolicitud,
    updateSolicitud
} from "../controllers/solicitud.controller.js";

const router = express.Router();

router.post("/", createSolicitud);
router.get("/:id", getSolicitudPorId);
router.get("/", getSolicitudes);
router.delete("/:id", deleteSolicitud);
router.put("/:id", updateSolicitud);
router.put("/estado/:id", updateEstadoSolicitud);

export default router;