import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtGenerator = (result) => {
  const { id, name, lastName, role_id } = result;

  const payload = {
    id: id,
    name: name,
    lastName, lastName,
    role_id: role_id,
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1m" })

}

const jwtDecoded = (req,res,token) => {

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded
    console.log("Verificado:", decoded);
    return decoded
  } catch (err) {
    res.status(403).json({message: "Token inválido", ok: false})
  }

}

export { jwtDecoded, jwtGenerator }