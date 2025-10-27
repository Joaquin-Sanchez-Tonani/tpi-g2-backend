import { Op } from "sequelize";
import { Appointments } from "../models/appointment.models.js";
import { Times } from "../models/time.models.js"
import { Users } from "../models/user.models.js";

async function GetTimes(req, res) {
    try {
        const result = await Times.findAll()
        if (!result) return res.status(404).json({ message: "No hay horarios existentes", ok: false })
        else return res.status(200).json({ message: "Horarios encontrados", ok: true, times: result })
    } catch (e) {
        console.log("GetTimes error: ", e)
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

async function GetBusyAppointment(req, res) {
    const { date, specialist_id } = req.query;
    if (!date || !specialist_id) {
        return res.status(400).json({ message: "Faltan parámetros", ok: false });
    }
    try {
        const result = await Appointments.findAll({
            where: { date, specialist_id }
        });

        if (result.length > 0) {
            return res.status(200).json({ message: "Turnos encontrados", ok: true, appointments: result });
        } else {
            return res.status(200).json({ message: "No se encontraron turnos", ok: false, appointments: result });
        }
    } catch (e) {
        console.error("GetBusyAppointment error:", e);
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

async function CreateAppointment(req, res) {
    const { date, time_id, specialist_id } = req.body
    if (!date || !time_id || !specialist_id) return res.status(400).json({ message: "Faltan seleccionar datos", ok: false });
    try {
        const specialistTaken = await Appointments.findOne({ where: { date, time_id, specialist_id } })
        if (specialistTaken) {
            return res.status(400).json({ message: "Turno ya reservado con ese especialista", ok: false, error: 1 });
        }
        const patientTaken = await Appointments.findOne({ where: { date, time_id, patient_id: req.user.id } });
        if (patientTaken) {
            return res.status(400).json({ message: "Ya tenés un turno en ese horario", ok: false, error: 2 });
        }

        const appointment = await Appointments.create({
            date,
            time_id,
            specialist_id,
            patient_id: req.user.id
        });
        if (appointment) return res.status(200).json({ message: "Turnos creado", ok: true, appointments: appointment })
        else return res.status(404).json({ message: "Turno existente", ok: false })
    } catch (e) {
        console.error("CreateAppointment error:", e);
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

async function GetAppointmentsForId(req, res) {
    try {
        const appointments = await Appointments.findAll({
            where: {
                [Op.or]: [
                    { patient_id: req.user.id },
                    { specialist_id: req.user.id }
                ]
            },
            include: [
                {
                    model: Users,
                    as: 'patient',
                    attributes: ['name', 'lastName']
                },
                {
                    model: Users,
                    as: 'specialist',
                    attributes: ['name', 'lastName']
                },
                {
                    model: Times,
                    attributes: ['time']
                }
            ]
        }
        )
        if (!appointments) return res.status(200).json({ message: "No se encontraron turnos", ok: false });
        return res.status(200).json({ message: "Se han encontrado turnos", ok: true, appointments: appointments });
    } catch (e) {
        console.log(e)
    }

}

const deleteAppointment = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { id } = req.params;  
        const appointment = await Appointments.findOne({
            where: {
                id,
                patient_id: userId
            }
        });
        if (!appointment) {
            return res.status(404).json({ message: "No encontrado o autorizado", ok:false });
        }
        appointment.status = false;
        await appointment.save();
        return res.json({ message: "Turno cancelado correctamente", ok:true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor", ok:false });
    }
};

export { GetTimes, GetBusyAppointment, CreateAppointment, GetAppointmentsForId, deleteAppointment }