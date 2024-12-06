//const { createUser } = require('../services/userServices');

// a) Importa el paquete
const Facturapi = require('facturapi').default;
// b) Crea una instancia del cliente, usando la llave secreta
//    de la organización emisora (https://dashboard.facturapi.io/integration/apikeys)
const facturapi = new Facturapi('sk_test_o7zyr5JOj8NeV1DPXZ71DWYJbR69M0nA23RGqdag4v');


async function createProduct(product) {
  const facturapiProduct = {
    description: product.description,
    product_key: "50202306",
    price: product.price
  };
  return await facturapi.products.create(facturapiProduct);
}

async function createUser(user) {
  try {
    const facturapiUser = {
      legal_name: user.Name,
      tax_id: user.rfc,
      tax_system: user.tax_system,
      email: user.email,
      address: {
        zip: user.address.zip,
      }
    };
    console.log('Datos enviados a Facturapi:', facturapiUser);
    return await facturapi.customers.create(facturapiUser);
  } catch (error) {
    console.error('Error al crear el usuario en Facturapi:', {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : null
    });
    throw new Error('No se pudo crear el usuario en Facturapi.');
  }
}


async function removedCustomer(idU) {
  try {
    console.log("ID del cliente recibido:", idU); // Log para depuración
    return await facturapi.customers.del(idU);
  } catch (error) {
    console.error('Error al eliminar el cliente en Facturapi:', {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : null
    });
    throw new Error('No se pudo eliminar el usuario en Facturapi.');
  }



};


module.exports = {
  createProduct,
  createUser,removedCustomer
};