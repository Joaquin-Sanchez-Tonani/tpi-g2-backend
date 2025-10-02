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

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "0.5h" })

}

const jwtDecoded = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}

export { jwtDecoded, jwtGenerator }