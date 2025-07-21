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

router.get("/", getAllHogares);
router.get("/:id", getHogar);

router.use(authenticateJwt); 

router.post("/", isAdmin, createHogar);
router.patch("/:id", isAdmin, updateHogar);
router.delete("/:id", isAdmin, deleteHogar);


export default router;
