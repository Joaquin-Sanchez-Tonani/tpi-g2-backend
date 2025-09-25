import { jwtDecoded } from "../utils/jsonwebtoken.js"

export function CheckAdmin(req,res,next){
    var token = null
    try{
        token = jwtDecoded(req,res,req.headers.key.split(" ")[3])
    }catch(error){
        console.log("Error:", error)
    }
    const permission = token && token.role_id
    const necessary_level = 3
    if(permission !== necessary_level){
        return res.status(403).send("Usuario no autorizado")
    }
    next()
}