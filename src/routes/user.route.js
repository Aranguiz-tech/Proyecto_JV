import express from "express";
import { createUsuario, getUserPorRut, deleteUsuario} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUsuario);
router.delete("/:rut", deleteUsuario); 
router.get("/:rut", getUserPorRut);
export default router;
