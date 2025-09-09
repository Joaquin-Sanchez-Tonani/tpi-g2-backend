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
            res.send("Usuario creado correctamente");
        } else {
            res.status(400).send(`Ya existe un usuario con ese email. --${user.email}--`);
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
        return res.status(401).json({"message" : "Usuario Inexistente", "ok": false});
    }
    try{
        resultPassword = await bs.compare(password,result.password)
        if(!resultPassword){throw new Error("Contraseña Invalida")}
    } catch(error){
        console.log(error);
        return res.status(401).json({"message" : "Contraseña Invalida", "ok": false});
    }
    
    const token =  jwtGenerator(result);
    res.json({"token": token, "message": "Bienvenido", "ok": true})
   //res.send(jwtDecoded(token))
}

async function GetUser(req,res){
    const users = await Users.findAll();
    res.send(users)
}

export {Login, Register, GetUser};