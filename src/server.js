const sequelize = require('./config/database');
const app = require('./app');
const dotenv = require('dotenv');
require('./models/associations');//Importa las asociaciones entre modelos

dotenv.config();

const PORT = 3000;// Establecer el puerto para el proyecto

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequalize');
        app.listen(PORT, () => {
            console.log('Servidor corriendo en http://localhost:${PORT}');
        });
    })
    .catch(err => console.error('Error conectando a la base de datos:', err));

sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
}).catch(err => {
    console.error('Error al sincronizar la base de datos', err);
});