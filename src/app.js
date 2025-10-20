import express from 'express';
import { harcodeData, harcodeUsers, PORT } from './config/config.js';
import { sequelize } from './database/database.js';
import './models/relations/relations.js'
import { roles } from './utils/roles.data.js';
import cors from "cors";
import { Roles, Specialties, Times, Users, Appointments } from './models/relations/relations.js';
import dashboardRouter from './routes/dashboard.routes.js';
import appointmentRouter from './routes/appointment.routes.js';
import authRouter from './routes/auth.routes.js';
import { times } from './utils/time.data.js';
import { specialties } from './utils/specialties.data.js';
import { users } from './utils/users.data.js';
import { appointment } from './utils/appointment.data.js';
import profileRouter from './routes/profile.routes.js';

const app = express();
app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173", // permitir solo el frontend
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true
}));

async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); // Add { force: true } if you want to drop and recreate tables
        await harcodeData(Roles, roles, "type", "Role creado.", "Role ya existente.");
        await harcodeData(Times, times, "time", "Horario creado.", "Horario ya existente.");
        await harcodeData(Specialties, specialties, "specialty", "Especialidad creada.", "Especialidad ya existente.");
        await harcodeUsers(Users,users)
         await harcodeData(Appointments, appointment, "appointmen", "appointmen creado", "appointmen ya existente");
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        });
        console.log("Connection has been established successfully.");    
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();

app.use("/auth", authRouter)
app.use("/appointment", appointmentRouter)
app.use("/dashboard", dashboardRouter)
app.use("/profile", profileRouter)
