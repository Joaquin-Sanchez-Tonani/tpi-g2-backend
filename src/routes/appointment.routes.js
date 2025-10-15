import { Router } from "express";

import {GetSpecialties} from "../controllers/specialties.controller.js";
import { GetSpecialists } from "../controllers/specialists.controller.js";
import { CreateAppointment, GetBusyAppointment, GetTimes } from "../controllers/appointment.controller.js";
import { isLogin , isAdmin} from "../middlewares/checkAdmin.middleware.js"


const appointmentRouter = Router();
appointmentRouter.get('/isLogin', isLogin);
appointmentRouter.get('/isAdmin', isAdmin);
appointmentRouter.get("/specialties", GetSpecialties);
appointmentRouter.get("/specialists/:id", GetSpecialists)
appointmentRouter.get("/busy", GetBusyAppointment)
appointmentRouter.get("/times", GetTimes)
appointmentRouter.post("/create", CreateAppointment)

export default appointmentRouter;
