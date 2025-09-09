import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/user.routes.js';
import { sequelize } from './database/database.js';
import './models/relations/relations.js'
import { Roles } from './models/relations/relations.js';
import cors from "cors";



const app = express();
app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173", // permitir solo el frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

async function main() {
    try {
        await sequelize.authenticate();
        //await sequelize.sync({ force: true }); // Add { force: true } if you want to drop and recreate tables
        await Roles.create({type: "Patient"})
        await Roles.create({type: "Specialist"})
        await Roles.create({type: "Admin"})
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        });
        console.log("Connection has been established successfully to totilaflame's server.");    
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();

app.use("/auth", userRoutes)
