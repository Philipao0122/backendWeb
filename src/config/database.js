// Se importa  la clase Sequelize del modulo de 'sequelize' para crear una instancia de la db
const {Sequelize} = require('sequelize');
const dotenv = require('dotenv'); // El dotenv es para poder cargar variables de entorno

dotenv.config();// Se cargan las variables de entorno
console.log('DB_NAME:', process.env.DB_NAME, typeof process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER, typeof process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST, typeof process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT, typeof process.env.DB_PORT);
// Se crea la nueva instancia de Sequelize pasando parametros necesarios para la conección a la db
const sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    timezona: '-05:00'

});

// por ultimo se exporta la instacia de sequelize para que pueda ser utilizada en otros archivos del proyecto
module.exports = sequelize;