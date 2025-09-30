import { Router } from "express";
import {GetUser, DeleteUser, PatchUser} from "../controllers/user.controller.js"
import { CreateSpecialty, DeleteSpecialty } from "../controllers/specialties.controller.js";
import { CheckAdmin } from "../middlewares/checkAdmin.middleware.js";

const dashboardRouter = Router()

dashboardRouter.post("/specialty", CreateSpecialty)
dashboardRouter.delete("/specialty", DeleteSpecialty)

dashboardRouter.get("/users", GetUser)
dashboardRouter.delete("/users/:id", DeleteUser)
dashboardRouter.patch("/users/:id", PatchUser)

export default dashboardRouter


