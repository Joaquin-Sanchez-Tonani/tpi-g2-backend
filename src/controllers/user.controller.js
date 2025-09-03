import { Users } from "../models/user.models.js"

async function Register(req, res) {
    const { username, email, password, role } = req.body;
    try {
        const [user, created] = await Users.findOrCreate({
            where: { email: email },
            defaults: {
                username: username,
                password: password,
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

export {Login, Register};