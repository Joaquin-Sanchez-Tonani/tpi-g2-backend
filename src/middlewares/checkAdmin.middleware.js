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