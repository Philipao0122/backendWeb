/**
 * Servicio de proyectos
 * Este servicio contiene los métodos para interactuar con la tabla de proyectos
 * en la base de datos.
 */

const Project = require('../models/project.model');
const User = require('../models/user.model');

/**
 * Crea un nuevo proyecto en la base de datos
 * @param {string} nombre - Nombre del proyecto
 * @param {string} descripcion - Descripción del proyecto
 * @param {integer} administrador_id - Identificador del administrador del proyecto
 * @returns {Promise<Project>} - El proyecto creado
 */
exports.createProject = async (nombre, descripcion, administrador_id) => {
    try {
        const newProject = await Project.create({ 
            descripcion,
            administrador_id
        });

        return newProject; 
    } catch (err) {
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};

/**
 * Obtiene todos los proyectos de la base de datos
 * @returns {Promise<Project[]>} - Un array de proyectos
 */
exports.getAllProjects = async () => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre', 'email']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });
        return projects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

/**
 * Obtiene un proyecto por su identificador
 * @param {integer} id - Identificador del proyecto
 * @returns {Promise<Project>} - El proyecto encontrado
 */
exports.getProjectById = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        return project;
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

/**
 * Asigna usuarios a un proyecto
 * @param {object} data - Un objeto con los siguientes atributos:
 *  - projectId: Identificador del proyecto
 *  - userIds: Un array de identificadores de usuarios
 * @returns {Promise<Project>} - El proyecto con los usuarios asignados
 */
exports.assingUsersToProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) throw new Error('Proyecto no encontrado');

    const users = await User.findAll({ where: { id: data.userIds }});
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await project.addUsuarios(users);
    return await project.reload({
        include: [
            {
                model: User,
                as: 'usuarios',
                attributes: ['id', 'nombre', 'email'],
                through: { attributes: [] }
            }
        ],
    });
    return project;
};

/**
 * Elimina un usuario de un proyecto
 * @param {object} data - Un objeto con los siguientes atributos:
 *  - projectId: Identificador del proyecto
 *  - userId: Identificador del usuario
 * @returns {Promise<void>} - No devuelve nada
 */
exports.removeUserFromProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) 
        throw new Error('Proyecto no encontrado'); 
    const user = await User.findByPk(data.userId);
    if (!user) 
        throw new Error('Usuario no encontrado'); 
    await project.removeUsuario(user); 
};

/**
 * Actualiza un proyecto
 * @param {integer} id - Identificador del proyecto
 * @param {string} nombre - Nuevo nombre del proyecto
 * @param {string} descripcion - Nueva descripción del proyecto
 * @param {integer} administrador_id - Nuevo identificador del administrador del proyecto
 * @returns {Promise<Project>} - El proyecto actualizado
 */
exports.updateProject = async (id, nombre, descripcion, administrador_id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.update({ 
            nombre,
            descripcion,
            administrador_id,
        });

        return project; 
    } catch (err) {
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};

/**
 * Elimina un proyecto
 * @param {integer} id - Identificador del proyecto
 * @returns {Promise<object>} - Un objeto con un mensaje de éxito
 */
exports.deleteProject = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        
        await project.destroy();
        return { message: 'Proyecto eliminado con éxito' };
    } catch (err) {
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};