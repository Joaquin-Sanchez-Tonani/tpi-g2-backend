import { Router } from "express";
import {Login, Register, ValidateUser} from "../controllers/user.controller.js"
import { CheckAdmin } from "../middlewares/checkAdmin.middleware.js";
const authRouter = Router()

authRouter.post("/register", Register)
authRouter.post("/login", Login)
authRouter.get("/isAdmin", CheckAdmin, ValidateUser)

export default authRouter