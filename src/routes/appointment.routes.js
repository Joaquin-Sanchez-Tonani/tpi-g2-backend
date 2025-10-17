import { Router } from "express";

import {GetSpecialties} from "../controllers/specialties.controller.js";
import { GetSpecialists } from "../controllers/specialists.controller.js";
import { CreateAppointment, GetBusyAppointment, GetTimes } from "../controllers/appointment.controller.js";
import { isLogin } from "../middlewares/checkAdmin.middleware.js"
import { ValidateUser } from "../controllers/user.controller.js";


const appointmentRouter = Router();
appointmentRouter.get('/isLogin', isLogin, ValidateUser);
appointmentRouter.get("/specialties", GetSpecialties);
appointmentRouter.get("/specialists/:id", GetSpecialists)
appointmentRouter.get("/busy", GetBusyAppointment)
appointmentRouter.get("/times", GetTimes)
appointmentRouter.post("/create",isLogin, CreateAppointment)

export default appointmentRouter;
