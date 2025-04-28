
const express = require('express');
const router = express.Router(); // Creamos una instancia de router para definir rutas
const authController = require('../controllers/auth.controller'); // Importamos el controlador de autenticación
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware'); // Middlewares que se utilizan para autenticar tokens y para verificar los roles de los usuarios
const ROLES = require('../utils/constants');



router.post('/login', authController.login);
module.exports = router;