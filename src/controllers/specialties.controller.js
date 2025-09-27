import { Specialties } from "../models/specialties.models.js"


async function GetSpecialties(req,res){
    try{
        const specialties = await Specialties.findAll()
        res.status(200).json({ message: "Especialidades encontradas", ok: true, specialties})
    }catch(e){
        console.log("Error getting specialties: ", e)
    }
}

async function CreateSpecialty(req,res){
    const result = req.body
    try{
        const [data, created] = await Specialties.findOrCreate({
            where: { specialty : result.specialty },
            defaults: {
                description: result.description
            }
        })
        if(!created) return res.status(200).json({ message: "Especialidad existente", ok: false})
        res.status(200).json({ message: "Especialidad se ha creado con éxito", ok: true, data})
    }catch(e){
        console.log("Error getting specialties: ", e)
    }
}

async function DeleteSpecialty(req,res){
    const result = req.body
    try{
        const isDeleted = await Specialties.destroy({ where: { id: result.id }, force: true})
        if(!isDeleted) return res.status(200).json({ message: "Especialidad no encontrada", ok: false})
        res.status(200).json({ message: "Especialidad eliminada con éxito", ok: true})
    }catch(e){
        console.log("Error getting specialties: ", e)
    }
}

export {GetSpecialties, CreateSpecialty, DeleteSpecialty}