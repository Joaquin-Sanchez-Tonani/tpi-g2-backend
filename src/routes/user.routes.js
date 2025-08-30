import { Router } from "express";
import {Login, Register} from "../controllers/user.controller.js"
const userRoutes = Router()

userRoutes.post("/register", Register)
userRoutes.post("/login", Login)


export default userRoutes