import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import path from 'path';

const swaggerPath = path.resolve('src', 'swagger.json');

const swaggerDocumentation = JSON.parse(readFileSync(swaggerPath, 'utf-8'));


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));    

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation))
app.use("/api", authRoutes)
app.use("/api", tasksRoutes)

export default app;