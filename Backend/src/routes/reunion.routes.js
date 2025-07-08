"use strict";
import { Router } from "express";
import {
  cancelarReunion,
  createReunion,
  deleteReunion,
  getAllReuniones,
  
} from "../controllers/reunion.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router.use(authenticateJwt).use(isAdmin);

router
  .get("/", getAllReuniones)
  .post("/", createReunion)
  .patch("/cancelar/:id", cancelarReunion)
  .delete("/:id", deleteReunion);

export default router;
