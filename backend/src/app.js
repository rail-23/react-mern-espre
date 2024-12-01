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
    origin: ['http://localhost:5173', 'https://react-mern-frontend-1wcw.onrender.com'], 
    credentials: true, 
    
}));

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente 🚀');
});

app.use((req, res, next) => {
    res.status(404).json({
        message: 'La ruta que intentas acceder no existe.',
    });
});
// Rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/licenses', licenseRoutes);

// Exportar app
export default app;
