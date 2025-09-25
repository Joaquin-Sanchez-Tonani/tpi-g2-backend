import { Router } from "express";
import { CheckAdmin } from "../middlewares/checkAdmin.middleware.js";
import {Login, Register, GetUser, DeleteUser, PatchUser} from "../controllers/user.controller.js"
const userRoutes = Router()

userRoutes.post("/register", Register)
userRoutes.post("/login", Login)
userRoutes.get("/users", CheckAdmin, GetUser)
userRoutes.delete("/users/:id", CheckAdmin, DeleteUser)
userRoutes.patch("/users/:id", CheckAdmin, PatchUser)

export default userRoutes