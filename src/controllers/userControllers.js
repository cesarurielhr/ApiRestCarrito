const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  const { username, password } = req.body;
  const user = await userModel.findOne({username});
  if (!user)
    return res
      .status(403)
      .json({ code: 403, message: "Usuario no encontrado" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return res
      .status(403)
      .json({ code: 403, message: "Contraseña incorrecta" });


  return res.status(200).json({
    code: 200,
    message: "Inicio de sesión exitoso",
  });
}

async function register(req, res) {
  const { username, password } = req.body;
  const user = await userModel.findOne({username});

  console.log(user);

  if(user){
    return res
      .status(403)
      .json({ code: 403, message: "Este usuario ya existe" });
  }

  const cryptpass = bcrypt.hashSync(password, 10);

  const nuevoUsuario = new userModel({
    username: username, 
    password: cryptpass
  });

  await nuevoUsuario.save();
  return res
      .status(200)
      .json({ code: 200, message: "Registrado exitosamente" });
}

module.exports = { 
    login, 
    register };