import { Router } from "express";
import { GetSpecialties } from "../controllers/appointment.controller.js";
const specialtiesRouter = Router();

specialtiesRouter.get("/specialties", GetSpecialties);

export default specialtiesRouter;
