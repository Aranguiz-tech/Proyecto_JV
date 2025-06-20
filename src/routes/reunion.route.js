import express from "express";
import { createReunion} from "../controllers/reunion.controller.js";

const router = express.Router();

router.post("/", createReunion);

export default router;