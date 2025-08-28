import express from 'express';
import { PORT } from './config.js';
import turnosRoutes from "./routes/turnosRoutes.js"

export const app = express();
app.use(express.json())

app.listen(PORT);
app.use(turnosRoutes);
console.log(`Server listening on port ${PORT}`)