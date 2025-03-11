const sequalize = require('./config/db');
const app = require('./app');
const dotenv = require('dotenv');
require("./models/associations");


dotenv.config();

sequalize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida');
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

sequalize.sync({ force: false }).then(() => {
    console.log('Tablas sincronizadas');
}).catch(err => {
    console.error('No se pudieron sincronizar las tablas:', err);
});