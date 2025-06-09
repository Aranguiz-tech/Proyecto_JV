import express from "express";
import { createUsuario, getUserPorRut, deleteUsuario, createHogar} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUsuario);
router.post("/hogar", createHogar);
router.delete("/:rut", deleteUsuario); 
router.get("/:rut", getUserPorRut);
export default router;
