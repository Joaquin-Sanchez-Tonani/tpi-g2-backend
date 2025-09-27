import { Router } from "express";
import {GetUser, DeleteUser, PatchUser} from "../controllers/user.controller.js"
import { CreateSpecialty, DeleteSpecialty } from "../controllers/specialties.controller.js";
import { CheckAdmin } from "../middlewares/checkAdmin.middleware.js";

const dashboardRouter = Router()

dashboardRouter.post("/specialty", CheckAdmin, CreateSpecialty)
dashboardRouter.delete("/specialty", CheckAdmin, DeleteSpecialty)

dashboardRouter.get("/users", CheckAdmin, GetUser)
dashboardRouter.delete("/users/:id", CheckAdmin, DeleteUser)
dashboardRouter.patch("/users/:id", CheckAdmin, PatchUser)

export default dashboardRouter


