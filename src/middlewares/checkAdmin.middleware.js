import { jwtDecoded } from "../utils/jsonwebtoken.js"

export function CheckAdmin(req,res,next){
    var tokenDecoded = null
    try{
        const token = req.headers["authorization"]?.split(" ")[1];
        tokenDecoded = jwtDecoded(req,res,token)
    }catch(error){
        console.log("Error:", error)
        return res.status(403).json({message: "El token no se pudo decodear", ok: false})
    }
    const permission = tokenDecoded && tokenDecoded.role_id
    const necessary_level = 3
    if(permission < necessary_level){
        return res.status(403).json({message: "Usuario no autorizado", ok: false})
    }
    next()
}


export function isLogin(req, res, next) {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Usuario no logeado", ok: false });
        }

        const decoded = jwtDecoded(req,res,token);

        if (!decoded) {
            return res.status(401).json({ message: "Token inválido", ok: false });
        }

        req.user = decoded; 
    } catch (error) {
        return res.status(500).json({ message: "Error en servidor", ok: false });
    }
    next()
}