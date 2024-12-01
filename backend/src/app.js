import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'; 
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import licenseRoutes from './routes/licensia.routes.js';

dotenv.config(); // Cargar el archivo .env

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CORS_ORIGINS.split(','),  
    credentials: true,
}));

// Rutas
app.use(process.env.AUTH_ROUTE, authRoutes);
app.use(process.env.USER_ROUTE, userRoutes);
app.use(process.env.LICENSE_ROUTE, licenseRoutes);

// Middleware de 404
app.use((req, res, next) => {
    res.status(404).json({
        message: 'La ruta que intentas acceder no existe.',
    });
});

// Exportar app
export default app;

