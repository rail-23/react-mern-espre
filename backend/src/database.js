import mongoose from 'mongoose'; // Importamos mongoose
import 'dotenv/config'; // Cargamos las variables del archivo .env

// Obtenemos la URI desde el archivo .env
const URI = process.env.MONGODB_URI;

// Conexión a la base de datos
mongoose.connect(URI, {
        
})
        .then(() => console.log('Conectado a MongoDB Atlas'))
        .catch(error => console.log('Error conectando a MongoDB Atlas:', error));
