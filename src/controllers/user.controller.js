import { json } from "sequelize";
import { Users } from "../models/user.models.js"
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

function Login(req,res){
    res.send("jjojo")
}

async function GetUser(req,res){
    const users = await Users.findAll();
    res.send(users)
}

export {Login, Register, GetUser};