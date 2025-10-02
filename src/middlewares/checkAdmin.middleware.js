import { jwtDecoded } from "../utils/jsonwebtoken.js"

export function CheckAdmin(req,res,next){
    var tokenDecoded = null
    try{
        const token = req.headers["authorization"]?.split(" ")[1];
        tokenDecoded = jwtDecoded(req,res,token)
    }catch(error){
        console.log("Error:", error)
    }
    const permission = tokenDecoded && tokenDecoded.role_id
    const necessary_level = 3
    if(permission < necessary_level){
        return res.status(403).send("Usuario no autorizado")
    }
    next()
}


export function isLogin(req, res) {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        console.log("TOKEN RECIBIDO:", token);

        if (!token) {
            return res.status(401).json({ message: "Usuario no logeado", ok: false });
        }

        const decoded = jwtDecoded(token);

        if (!decoded) {
            return res.status(401).json({ message: "Token inválido", ok: false });
        }

        req.user = decoded; // opcional, para usar info del usuario
        return res.status(200).json({ message: "Permitido", ok: true, user: decoded });

    } catch (error) {
        return res.status(500).json({ message: "Error en servidor", ok: false });
    }
}