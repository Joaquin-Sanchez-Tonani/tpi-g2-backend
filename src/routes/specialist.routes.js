import { Router } from "express";

const router = Router();

router.get("/medics", (_, res) => {
    res.send("Obteniendo medicos")
});

export default router;
