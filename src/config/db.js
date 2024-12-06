require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

// Conexión a MongoDB
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Salir del proceso en caso de error
    }
};

module.exports = connectDB;