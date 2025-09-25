import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/user.routes.js';
import { sequelize } from './database/database.js';
import './models/relations/relations.js'
import { roles } from './utils/roles.data.js';
import cors from "cors";
import { Roles } from './models/relations/relations.js';
import specialtiesRouter from './routes/specialties.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';



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
        await sequelize.sync(); // Add { force: true } if you want to drop and recreate tables
        for( const rol of roles ){
            const [data, isCreated] = await Roles.findOrCreate({
                where: {type: rol.type},
                defaults: rol
            })
            if(isCreated){
                console.log(`Role creado. ${data.type}`)
            }else{
                console.log(`Role ya existente. ${data.type}`)               
            }
        }
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
app.use("/appointment", specialtiesRouter)
app.use("/dashboard", dashboardRouter)
