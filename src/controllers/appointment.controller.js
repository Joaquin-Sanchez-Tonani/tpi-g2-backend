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
    const { date, time_id, specialist_id, patient_id } = req.body
    if (!date || !time_id || !specialist_id) return res.status(400).json({ message: "Faltan seleccionar datos", ok: false , body: req.user.id});
    try {
        const [data, isCreated] = await Appointments.findOrCreate({
            where: {
                date: date,
                time_id: time_id,
                specialist_id: specialist_id,
                patient_id: patient_id
            },
            //  defaults: {
            //     patient_id: req.user.id
            //  }
        })
        if (isCreated) return res.status(200).json({ message: "Turnos creado", ok: true, appointments: data })
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
                    attributes: ['name'],

                },
                {
                    model: Users,
                    as: 'specialist',
                    attributes: ['name']
                },
                {
                    model: Users,
                    as: 'specialist',
                    attributes: ['lastName']
                },
                {
                    model: Users,
                    as: 'specialist',
                    attributes: ['specialty_id']
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

export { GetTimes, GetBusyAppointment, CreateAppointment, GetAppointmentsForId }