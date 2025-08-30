import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/user.routes.js';
import { sequelize } from './database/database.js';

const app = express();
app.use(express.json())

async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        });
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();

app.use("/auth", userRoutes)
