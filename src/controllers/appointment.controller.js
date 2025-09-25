import { Specialties } from "../models/specialties.models.js"

async function GetSpecialties(req,res){
    try{
        const specialties = await Specialties.findAll()
        res.status(200).json({ message: "Especialidades encontradas", ok: true, specialties})
    }catch(e){
        console.log("Error getting specialties: ", e)
    }
}

async function Specialists(req,res){
    res.send("Appointment")
}

export { GetSpecialties , Specialists }