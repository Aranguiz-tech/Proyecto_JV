import express from "express";
import { createUsuario, getUserPorRut } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUsuario);
router.get("/:rut", getUserPorRut);
export default router;
