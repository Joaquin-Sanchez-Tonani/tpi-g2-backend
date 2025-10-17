import { Router } from "express";
import { isLogin } from "../middlewares/checkAdmin.middleware.js";
import { PatchUserProfile, UserData } from "../controllers/user.controller.js";
import { GetAppointmentsForId } from "../controllers/appointment.controller.js";

const profileRouter = Router()

profileRouter.get("/user", isLogin, UserData)
profileRouter.patch("/user", isLogin, PatchUserProfile)
profileRouter.get("/appointments", isLogin, GetAppointmentsForId)
export default profileRouter