import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

import userRoutes from './routes/user.routes.js';
import licenseRoutes from './routes/licensia.routes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173', // Ajusta la URL de tu frontend si es necesario
}));

// Rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/licenses', licenseRoutes);

// Exportar app
export default app;
