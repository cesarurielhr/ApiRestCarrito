const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/userRoutes');
const carrito = require('./routes/carritoRoutes.js');
const dotenv = require('dotenv');
const app = express();


app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/carrito', carrito)

app.get('/', (req, res, next) => {
    res.send(
        `<h1>API RESTFULL de Carrito de Compras</h1> <p> Leer: <a href="docs.com">api-tasks-docs</a> para mas información.</p>`
    );
})

app.use((req, res, next) => {
    res.status(404).json({ code: 404, message: 'Ruta no encontrada' });
});

const connectDB = require('./config/db.js');

dotenv.config();
PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});