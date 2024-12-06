const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const Usuario = mongoose.model('Usuarios', usuarioSchema);

module.exports = Usuario;