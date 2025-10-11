import { Users } from "../models/user.models.js";
import { jwtGenerator } from "../utils/jsonwebtoken.js";
import bs from "bcrypt";

async function Register(req, res) {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password) {
        return res.status(400).json({ message: "Faltan datos obligatorios", ok: false });
    }
    try {
        const hashedPassword = await bs.hash(password, 6);
        const [user, created] = await Users.findOrCreate({
            where: { email },
            defaults: { name, lastName, password: hashedPassword }
        });

        if (!created) {
            return res.status(200).json({ message: `Ya existe un usuario con ese email --${user.email}--`, ok: false });
        }
        return res.status(201).json({ message: "Usuario creado correctamente", ok: true });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

async function Login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Faltan credenciales", ok: false });
    }
    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Usuario inexistente", ok: false });
        }

        const validPassword = await bs.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña inválida", ok: false });
        }

        const token = jwtGenerator(user);
        return res.status(200).json({ token, message: "Bienvenido", ok: true, user: {id: user.id,name: user.name, lastName: user.lastName, email: user.email}});
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

async function GetUser(req, res) {
    try {
        const users = await Users.findAll();
        return res.status(200).json({ message: "Usuarios encontrados", ok: true, users: users });
    } catch (e) {
        console.error("Error fetching users:", e);
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

async function DeleteUser(req, res) {
    const id = req.params.id;
    if (id == req.user.id) {
        return res.status(403).json({ message: "No puedes borrarte a ti mismo", ok: false });
    }
    try {
        const deleted = await Users.destroy({ where: { id }, force: true });
        if (!deleted) {
            return res.status(404).json({ message: "Usuario no encontrado", ok: false });
        }
        return res.status(200).json({ message: "Usuario eliminado correctamente", ok: true });
    } catch (e) {
        console.error("Error deleting user:", e);
        return res.status(500).json({ message: "Error interno del servidor", ok: false });
    }
}

async function PatchUser(req, res) {
    const user_id = req.params.id;
    const body = req.body || req;
    try {
        const updates = {};
        if (body.role_id !== undefined) updates.role_id = body.role_id;
        if (body.specialty_id !== undefined) updates.specialty_id = body.specialty_id;
        if (body.licenseNumber !== undefined) updates.licenseNumber = body.licenseNumber;
        if (Object.values(updates).length === 0) return res.status(400).json({ message: "No hay información a modificar", ok: false })
        const [modified] = await Users.update(updates, { where: { id: user_id } });
        if (modified === 0) {
            return res.status(404).json({ message: "Usuario no encontrado", ok: false });
        }
        return res.status(200).json({ message: "Usuario modificado correctamente", ok: true });
    } catch (e) {
        console.error("Error modifying user:", e);
        return res.status(500).json({ message: "Error modificando usuario", ok: false });
    }
}

async function ValidateUser(req, res) {
    return res.status(200).json({ message: "Usuario permitido", ok: true });
}

export { Login, Register, GetUser, DeleteUser, PatchUser, ValidateUser };
