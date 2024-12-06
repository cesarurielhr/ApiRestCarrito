const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    facturapiId: { type: String },
    Name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    tax_system: { type: String, require: true },
    address: {
        street: { type: String, required: true },
        exterior_number: { type: String, required: true },
        interior_number: { type: String },
        neighborhood: { type: String, required: true },
        zip: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
    },
    registrationDate: { type: String, require: true },
    userTipe: { type: String, require: true },
    rfc: { type: String, require: true },
    PaymentMethod: { type: String, require: true, enum: ['Tarjeta', 'Paypal', 'Bitcoin', 'Tarjeta de Credito'] }
});

const User = mongoose.model('User', userSchema);
