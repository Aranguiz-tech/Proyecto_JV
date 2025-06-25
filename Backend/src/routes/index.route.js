import { Router } from "express";

import userRoute from "./user.routes.js";

import ReunionRoute from "./reunion.routes.js";

import solicitudRoute from "./solicitud.routes.js";


const router = Router();


router.use("/usuario", userRoute);

router.use("/reunion", ReunionRoute);

router.use("/solicitud", solicitudRoute);


export default router;
