"use strict";
import { Router } from "express";
import {
  createHogar,
  deleteHogar,
  getAllHogares,
  getHogar,
  updateHogar,
} from "../controllers/hogar.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router.use(authenticateJwt);
router.use(isAdmin);

router
  .get("/", getAllHogares) 
  .get("/:id", getHogar)
  .post("/", createHogar)
  .patch("/:id", updateHogar)
  .delete("/:id", deleteHogar);

export default router;
