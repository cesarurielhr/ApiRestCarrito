const mongoose = require('mongoose'); // Módulo para interactuar con MongoDB
require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Uso del nuevo parser
    useUnifiedTopology: true, // Soporte para monitoreo del driver
    })
    .then(() => {
        console.log('Conectado a MongoDB'); // Mensaje de éxito en la conexión
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error); // Mensaje de error en la conexión
    });


// Exportamos las instancias de mongoose y redisClient para usarlas en otras partes de la aplicación
module.exports = { mongoose, redisClient };