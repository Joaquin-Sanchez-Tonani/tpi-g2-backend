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
        return res.json({message: "Usuario no autorizado", ok: false , admin: false})
    } else {
    next()
    }

}



export function isAdmin(req, res) {
    const token = req.headers["authorization"]?.split(" ")[1];

    console.log(token)

    if (token == "null") {
        console.log("sale admin")
        return res.status(401).json({ message: "Token no proporcionado", ok: false, admin: false });
    }

    try {
        const tokenDecoded = jwtDecoded(req,res,token); // O tu método de decodificación
        const permission = tokenDecoded && tokenDecoded.role_id
        const necessary_level = 3;

        console.log(permission)

        if (permission < necessary_level) {
            return res.status(403).json({ message: "Usuario no autorizado", ok: false, admin: false });
        }

        return res.status(200).json({ message: "Usuario autorizado", ok: true, admin: true });
    } catch (error) {
        console.log("Error en token:", error);
        return res.status(401).json({ message: "Token inválido", ok: false, admin: false });
    }
}


export function isLogin(req, res, next) {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (token == "null" || !token == "undefined") {
            console.log("sale")
                return res.status(401).json({ message: "Usuario no logeado", ok: false });
        } else {
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