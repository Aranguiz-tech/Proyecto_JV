import { Router } from "express";
import userRoute from "./user.route.js";
import ReunionRoute from "./reunion.route.js";

const router = Router();


router.use("/usuario", userRoute);
router.use("/reunion", ReunionRoute);

export default router;
