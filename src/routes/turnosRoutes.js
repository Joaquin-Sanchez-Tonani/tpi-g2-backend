import { Router } from "express";

const router = Router();

router.get("/turnos", (_, res) => {
    res.send("Obteniendo turnos")
});

export default router;
