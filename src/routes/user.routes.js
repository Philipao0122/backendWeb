const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

// Rutas CRUD de usuarios (todas protegidas para ADMIN)
router.post('/', authenticateToken, checkRole([ROLES.ADMIN]), userController.createUser);
router.put('/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);
router.get('/', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);
router.get('/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getUserById);
router.delete('/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);
router.get('/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);


router.use(errorHandler);

module.exports = router;