import { Router } from "express";
import {
  cancelarReunion,
  createReunion,
  deleteReunion,
  getAllReuniones,
  finalizarReunion
} from "../controllers/reunion.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get("/", authenticateJwt, getAllReuniones); 
router.use(authenticateJwt, isAdmin); 
router
  .post("/", createReunion)
  .patch("/cancelar/:id", cancelarReunion)
  .delete("/:id", deleteReunion)
  .patch("/finalizar/:id", finalizarReunion);

export default router;
