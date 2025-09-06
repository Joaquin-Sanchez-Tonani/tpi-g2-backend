export function CheckAdmin(req,res,next){
    const permission = req.body.role_id
    const necessary_level = 3
    if(permission !== necessary_level){
        return res.status(403).send("Usuario no autorizado")
    }
    next()
}