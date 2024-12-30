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

const allowedOrigins = [
    'http://localhost:3000', 
    'http://localhost:5173',  // Agregar este si tu frontend está corriendo en este puerto
    'https://task-manager-fc.netlify.app'
  ];

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        // Permite la solicitud si está en la lista de dominios permitidos o no hay origin
        callback(null, true);
        } else {
        // Rechaza la solicitud si el origen no está permitido
        callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Para permitir el envío de cookies
};

app.use(cors(corsOptions));
// app.use(cors({
//     origin: 'https://task-manager-fc.netlify.app/login',
//     credentials: true,
// }));    

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation))
app.use("/api", authRoutes)
app.use("/api", tasksRoutes)

export default app;