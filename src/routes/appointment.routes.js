import { Router } from "express";

import {GetSpecialties} from "../controllers/specialties.controller.js";

const appointmentRouter = Router();

appointmentRouter.get("/specialties", GetSpecialties);

export default appointmentRouter;
