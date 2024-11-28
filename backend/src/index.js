import app from './app.js';

import './database.js';
 //import 'dotenv/config';
import 'dotenv/config'; 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
