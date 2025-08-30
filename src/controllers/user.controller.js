function Register(req,res){
    const { username, email, password } = req.body
    const checkEmailQuery = "SELECT EXISTS(SELECT 1 FROM users WHERE users.email = ?) AS email.exists"
    // SELECT EXISTS TIENE CORTA CON LA PRIMER COINCIDENCIA
    res.send("FUNCA")
}   

function Login(req,res){
    res.send("jjojo")
}

export {Login, Register};