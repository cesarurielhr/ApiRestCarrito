const User = require('../models/User'); // Modelo de usuario de Mongoose
const { createUser, removedCustomer } = require('../services/facturapiService'); // Servicios de Facturapi

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un usuario y sincronizar con Facturapi
exports.createUser = async (req, res) => {
    try {
        // Crear cliente en Facturapi
        const facturapiResponse = await createUser(req.body);
        console.log('Usuario creado en Facturapi:', facturapiResponse);

        // Guardar en MongoDB con el ID de Facturapi
        const user = new User({
            ...req.body,
            facturapiId: facturapiResponse.id,
        });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.error('Error en la creación del usuario:', error.message);
        res.status(400).json({ message: 'No se pudo crear el usuario.' });
    }
};

// Eliminar un usuario de MongoDB y Facturapi
exports.deleteUserByFacturapiId = async (req, res) => {
    try {
        const facturapiId = req.params.facturapiId;

        // Eliminar de Facturapi
        await removedCustomer(facturapiId);
        console.log(`Cliente con ID ${facturapiId} eliminado en Facturapi`);

        // Eliminar de MongoDB
        const user = await User.findOneAndDelete({ facturapiId });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json({ message: 'Usuario eliminado', user });
    } catch (error) {
        console.error('Error en la eliminación del usuario:', error.message);
        res.status(400).json({ message: 'No se pudo eliminar el usuario.' });
    }
};
