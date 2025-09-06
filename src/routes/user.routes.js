import { Router } from "express";
import { CheckAdmin } from "../middlewares/checkAdmin.middleware.js";
import {Login, Register, GetUser} from "../controllers/user.controller.js"
const userRoutes = Router()

userRoutes.post("/register", Register)
userRoutes.post("/login", Login)
userRoutes.get("/getUser", CheckAdmin, GetUser)


export default userRoutes