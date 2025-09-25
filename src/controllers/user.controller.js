import { json } from "sequelize";
import { Users } from "../models/user.models.js"
import {jwtGenerator, jwtDecoded} from "../utils/jsonwebtoken.js"
import bs from 'bcrypt'

async function Register(req, res) {
    const { name, lastName, email, password, role } = req.body;
    const hashedPassword = await bs.hash(password,6) 
        .then(data => json(data))
        .then(result => result.path)
    try {
        const [user, created] = await Users.findOrCreate({
            where: { email: email },
            defaults: {
                name: name,
                lastName: lastName,
                password: hashedPassword,
                role_id: role
            }
        });

        if (created) {
            res.status(200).json({message : "Usuario creado correctamente", ok : true});
        } else {
            res.status(400).json({message : `Ya existe un usuario con ese email. --${user.email}--`, ok : false});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
}

async function Login(req,res){
    const {email, password } = req.body;
    var result = null;
    var resultPassword = null;
    try{
        result = await Users.findOne({ where: { email : email }})
        if(!result){throw new Error("Usuario inexistente")}
    } catch(error){
        console.log(error);
        return res.status(401).json({message : "Usuario Inexistente", ok: false});
    }
    try{
        resultPassword = await bs.compare(password,result.password)
        if(!resultPassword){throw new Error("Contraseña Invalida")}
    } catch(error){
        console.log(error);
        return res.status(401).json({message : "Contraseña Invalida", ok: false});
    }
    
    const token =  jwtGenerator(result);
    res.json({token: token, message: "Bienvenido", ok: true})
}

async function GetUser(req,res){
    try{
        const users = await Users.findAll();
        res.status(200).json({ message: "Usuarios encontrados", ok: true, users: {users}})
    }catch(e){
        console.log("Error fetching users: ", e)
    }
}

async function DeleteUser(req,res) {
    const id = req.params.id
    if(id == req.user.id) return res.status(403).json({message: "No podes borrarte a vos mismo"})
    try{
        const deleted = await Users.destroy({
            where: {id : id},
            force: true
        })
        if(!deleted){
            res.status(404).json({message: "Usuario no encontrado", ok: false})
        }
        res.status(200).json({ message: "Usuario eliminado correctamente", ok: true });
    }catch(e){
        console.log("Error deleting user: ", e)
    }
}

async function PatchUser(req,res){
    const user_id = req.params.id
    const role_id = req.body.role_id
    try{
        const modified = await Users.update(
            {role_id : role_id},
            {
                where: {
                    id : user_id
                }
            }
        )
        if(modified == 0){
            res.status(404).json({message: "Usuario no encontrado", ok: false})
        }
        res.status(200).json({ message: "Usuario modificado correctamente", ok: true });
    }catch(e){
        console.log("Error modifying user: ", e)
    }
}

export {Login, Register, GetUser, DeleteUser, PatchUser};