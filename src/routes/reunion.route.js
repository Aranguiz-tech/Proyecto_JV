import express from "express";
import { createReunion, deleteReunion, cancelarReunion, getAllReuniones} from "../controllers/reunion.controller.js";

const router = express.Router();

router.post("/", createReunion);
router.get("/", getAllReuniones);
router.delete("/:id", deleteReunion);
router.put("/:id/cancelar", cancelarReunion);


export default router;