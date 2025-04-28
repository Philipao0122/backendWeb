const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Importa tus rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Usa tus rutas
app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);

// Ruta básica para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡API corriendo correctamente!');
});

module.exports = app;