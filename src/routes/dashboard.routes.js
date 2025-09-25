import { Router } from "express";
import { CreateSpecialty, DeleteSpecialty } from "../controllers/dashboard.controller.js";
import { CheckAdmin } from "../middlewares/checkAdmin.middleware.js";

const dashboardRouter = Router()

dashboardRouter.post("/specialty", CheckAdmin, CreateSpecialty)
dashboardRouter.delete("/specialty", CheckAdmin, DeleteSpecialty)

export default dashboardRouter