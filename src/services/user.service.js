/**
 * Servicio de Usuarios
 * Este módulo proporciona funciones para manejar operaciones CRUD de usuarios
 * en el sistema, incluyendo creación, búsqueda y gestión de usuarios.
 */
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

/**
 * Crea un nuevo usuario en el sistema
 * @param {string} nombre - Nombre completo del usuario
 * @param {string} email - Email del usuario (debe ser único)
 * @param {string} password - Contraseña del usuario (será hasheada)
 * @param {number} rol_id - ID del rol del usuario
 * @param {number} administrador_id - ID del administrador que crea el usuario
 * @returns {Promise<Object>} - Objeto del usuario creado
 * @throws {Error} Si el usuario ya existe o hay un error en la creación
 */
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ where: {email}}); 
        if (userExists) {
            throw new Error('El usuario ya existe');
        }
        
        // Hashear la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear el nuevo usuario con los datos proporcionados
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUser;
    } catch (err) {
        // Propagar el error con un mensaje más descriptivo
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

/**
 * Obtiene un usuario por su ID
 * @param {number} id - ID del usuario a buscar
 * @returns {Promise<Object>} - Objeto del usuario encontrado
 * @throws {Error} Si hay un error en la búsqueda
 */
exports.getUserById = async (id) => { 
    try {
        // Buscar usuario por ID excluyendo la contraseña por seguridad
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        
        return user; 
    } catch (err) {
        throw new Error(`Error al buscar el usuario: ${err.message}`);
    }
};

/**
 * Obtiene todos los usuarios creados por un administrador específico
 * @param {number} administrador_id - ID del administrador
 * @param {string} [email] - Email opcional para filtrar
 * @returns {Promise<Array>} - Lista de usuarios encontrados
 * @throws {Error} Si hay un error en la consulta
 */
exports.getAllUsersByAdministradorId = async (administrador_id, email) => {
    try {
        // Construir la cláusula WHERE para la consulta
        const whereClause = { administrador_id };
        if (email) {
            whereClause.email = email;
        }
        
        // Realizar la consulta a la base de datos
        const users = await User.findAll({
            where: whereClause,
            attributes: { exclude: ['password'] }
        });
        
        return users;
    } catch (err) {
        throw new Error(`Error al obtener usuarios: ${err.message}`);
    }
};

/**
 * Obtiene todos los usuarios con un rol específico
 * @param {number} rol_id - ID del rol
 * @returns {Promise<Array>} - Lista de usuarios encontrados
 * @throws {Error} Si hay un error en la consulta
 */
exports.getAllUsersByRolId = async (rol_id) => {
    try {
        // Realizar la consulta a la base de datos
        const users = await User.findAll({
            where: {rol_id},
            attributes: { exclude: ['password']}
        });
        
        return users;
    } catch (err) {
        throw new Error(`Error al obtener usuarios: ${err.message}`);
    }
};

/**
 * Actualiza un usuario existente
 * @param {number} id - ID del usuario a actualizar
 * @param {string} nombre - Nuevo nombre del usuario
 * @param {string} email - Nuevo email del usuario
 * @param {number} rol_id - Nuevo ID del rol del usuario
 * @param {number} administrador_id - Nuevo ID del administrador del usuario
 * @param {number} admin_from_token - ID del administrador que realiza la actualización
 * @returns {Promise<Object>} - Objeto del usuario actualizado
 * @throws {Error} Si hay un error en la actualización
 */
exports.updateUser = async (id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try {
        // Buscar el usuario por ID
        const user = await User.findByPk(id); 
        
        // Verificar si el usuario pertenece al administrador que realiza la actualización
        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no esta bajo su administración');
        }

        // Verificar si el usuario existe
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar si el email ya está en uso
        if (email && email !== user.email) { 
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                throw new Error('El email ya esta en uso');
            }
        }
        
        // Actualizar el usuario con los nuevos datos
        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id
        });

        return user;
    } catch (err) {
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

/**
 * Elimina un usuario existente
 * @param {number} id - ID del usuario a eliminar
 * @param {number} admin_from_token - ID del administrador que realiza la eliminación
 * @returns {Promise<Object>} - Objeto con el mensaje de eliminación
 * @throws {Error} Si hay un error en la eliminación
 */
exports.deleteUser = async (id, admin_from_token) => {
    try {
        // Buscar el usuario por ID
        const user = await User.findByPk(id);
        
        // Verificar si el usuario pertenece al administrador que realiza la eliminación
        if (user.administrador_id !== admin_from_token) { 
            throw new Error('Acceso denegado, este ususario no esta bajo su administración');
        }

        // Verificar si el usuario existe
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        
        // Eliminar el usuario
        await user.destroy();
        
        return { message: 'Usuario eliminado con éxito'};
    } catch (err) {
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};