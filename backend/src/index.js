import app from './app';
import './database'; // Si tienes configurada tu base de datos aquí

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});