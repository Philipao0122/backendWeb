const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller'); // Importamos el controlador de proyectos
const ROLES = require('../utils/constants');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');


router.post('/projects/create', authenticateToken, checkRole([ROLES.ADMIN]), projectController.createProject);
router.put('/projects/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject);
router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getAllProjects);
router.delete('/projects/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);
router.get('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getProjectById);

router.post('/projects/associate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.assingUsersToProject);
router.delete('/projects/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.removeUserFromProject);


module.exports = router;