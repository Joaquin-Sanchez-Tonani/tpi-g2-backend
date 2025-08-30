import { Router } from "express";

import Appointment from "../controllers/appointment.controller.js";

const router = Router();

router.get("/turnos", Appointment);

export default router;
