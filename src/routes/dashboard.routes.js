import { Router } from "express";
import {GetUser, DeleteUser, PatchUser} from "../controllers/user.controller.js"
import { CreateSpecialty, DeleteSpecialty } from "../controllers/specialties.controller.js";
import { CheckAdmin, CheckOwner } from "../middlewares/checkAdmin.middleware.js";

const dashboardRouter = Router()

dashboardRouter.post("/specialty",CheckOwner, CreateSpecialty)
dashboardRouter.delete("/specialty",CheckOwner, DeleteSpecialty)

dashboardRouter.get("/users",CheckOwner, GetUser)
dashboardRouter.delete("/users/:id",CheckAdmin, DeleteUser)
dashboardRouter.patch("/users/:id",CheckAdmin, PatchUser)

export default dashboardRouter


