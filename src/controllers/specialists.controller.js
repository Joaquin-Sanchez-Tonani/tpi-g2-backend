import { Specialties } from "../models/specialties.models.js";
import { Users } from "../models/user.models.js";

async function GetSpecialists(req, res) {
    const specialty_id = req.params.id;
    if (!specialty_id) {
        return res.status(400).json({ message: "Falta el ID de specialty", ok: false });
    }
    try {
        const specialtyFound = await Specialties.findOne({ where: { id: specialty_id } });
        if (!specialtyFound) {
            return res.status(404).json({ message: "Especialidad no existente", ok: false });
        }
        const specialists = await Users.findAll({
            where: { specialty_id: specialty_id }
        });

        if (specialists.length > 0) {
            return res.status(200).json({ message: "Especialistas encontrados", ok: true, specialists });
        } else {
            return res.status(404).json({ message: "No existen especialistas con esta especialidad", ok: false });
        }
    } catch (e) {
        console.error("GetSpecialists error:", e);
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

export { GetSpecialists };
