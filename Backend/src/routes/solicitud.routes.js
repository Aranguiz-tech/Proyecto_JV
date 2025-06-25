import express from "express";
import { 
    createSolicitud,
    deleteSolicitud, 
    getSolicitudes,  
    getSolicitudPorid, 
    updateEstadoSolicitud,
    updateSolicitud
} from "../controllers/solicitud.controller.js";

const router = express.Router();

router.post("/", createSolicitud);
router.get("/:id", getSolicitudPorid);
router.get("/", getSolicitudes);
router.delete("/:id", deleteSolicitud);
router.put("/:id", updateSolicitud);
router.put("/estado/:id", updateEstadoSolicitud);

export default router;