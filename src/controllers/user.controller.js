// Importar servicio de usuarios
const userService = require('../services/user.service');
const User = require('../models/user.model');

// Controlador para crear nuevos usuarios
exports.createUser = async (req, res) => {
    try { 
        const { nombre, email, password, rol_id, administrador_id } = req.body; // Se extrae los datos de la solicitud para el nuevo usuario
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser }); // 281 para la creacion de nuevos ususarios
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

r
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        
        const adminId = req.user.id;
        
        const users = await User.findAll({
            where: { administrador_id: adminId }
        });
        

        if (!users) {
            return res.status(200).json([]);
        }
        
    
        res.status(200).json(users);
    } catch (err) {
       
        res.status(500).json({ 
            message: 'Error al obtener los usuarios', 
            error: err.message 
        });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ 
            message: 'Error al buscar el usuario', 
            error: err.message 
        });
    }
};
//  Controlador para obtener a los usuarios asociados a un rol
exports.getAllUsersByRolId = async (req, res) => {
    try {
        const users = await userService.getAllUsersByRolId(req.params.id);
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
    const { id } = req.params; // extrae el id de la URL enviado como parametro
    const { nombre, email, rol_id, administrador_id } = req.body; // se extrae los datos actualizados 
    const admin_from_token = req.user.id;
    try {
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json({ message: 'El susuario a actualizado con éxito', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const admin_from_token = req.user.id;
    try {
        const result = await userService.deleteUser(id, admin_from_token);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
