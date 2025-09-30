import { Specialties } from "../models/specialties.models.js";

async function GetSpecialties(req, res) {
    try {
        const specialties = await Specialties.findAll();
        return res.status(200).json({ message: "Especialidades encontradas", ok: true, specialties });
    } catch (e) {
        console.error("Error getting specialties:", e);
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

async function CreateSpecialty(req, res) {
    const result = req.body;
    if (!result.specialty) {
        return res.status(400).json({ message: "Falta el nombre de la especialidad", ok: false });
    }
    try {
        const [data, created] = await Specialties.findOrCreate({
            where: { specialty: result.specialty },
            defaults: { description: result.description }
        });
        if (!created) {
            return res.status(200).json({ message: "Especialidad existente", ok: false });
        }
        return res.status(201).json({ message: "Especialidad creada con éxito", ok: true, data });
    } catch (e) {
        console.error("Error creating specialty:", e);
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

async function DeleteSpecialty(req, res) {
    const result = req.body;
    if (!result.id) {
        return res.status(400).json({ message: "Falta el ID de la especialidad", ok: false });
    }
    try {
        const isDeleted = await Specialties.destroy({ where: { id: result.id }, force: true });
        if (!isDeleted) {
            return res.status(404).json({ message: "Especialidad no encontrada", ok: false });
        }
        return res.status(200).json({ message: "Especialidad eliminada con éxito", ok: true });
    } catch (e) {
        console.error("Error deleting specialty:", e);
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

export { GetSpecialties, CreateSpecialty, DeleteSpecialty };
