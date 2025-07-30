"use strict";
import { Router } from "express";
import { createActa, getActa } from "../controllers/acta.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router.use(authenticateJwt).use(isAdmin);

router
  .post("/", createActa)
  .get("/:id", getActa);

export default router;
