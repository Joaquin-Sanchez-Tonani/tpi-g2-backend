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
        return res.status(403).json({message: "Usuario no autorizado", ok: false})
    }
    next()
}


export function isLogin(req, res) {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        console.log("TOKEN RECIBIDO:", token);

        if (token == "null") {
            console.log("sale")
            return res.status(401).json({ message: "Usuario no logeado", ok: false });
        } else {
            console.log("sigue")
            const decoded = jwtDecoded(req,res,token);

        if (!decoded) {
            return res.status(401).json({ message: "Token inválido", ok: false });
        } else {
                    req.user = decoded; 
                    return res.status(200).json({ message: "Permitido", ok: true ,user: req.user});
        }


        }


        //        return res.status(200).json({ token, message: "Bienvenido", ok: true, user: {name: user.name, lastName: user.lastName}});

    } catch (error) {
        return res.status(500).json({ message: "Error en servidor", ok: false });
    }
}