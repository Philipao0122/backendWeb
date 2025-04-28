const jwt = require('jsonwebtoken'); // Importar librería de "jsonwebtoken" para generar token de autenticación
const bcrypt = require('bcryptjs'); // Importar la librería "bcryptjs" para cifrar contraseñas
const dotenv = require('dotenv'); //importar las variables de entornos 
// importamos el modelo user y el modelo rol permisos
const  User = require ('../models/user.model');
const RolePermission = require('../models/rolePermission.model');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET; // clave secreta para generar el token de autenticación
exports.loginUser = async (email, password) => {
    // Buscamos el usuario en la base de datos por su email
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Usuario no encontrado');

    // Verificamos si la contraseña es válida
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Contraseña incorrecta');

    // Obtenemos los permisos asociados al rol del usuario
    const rolePermissions = await RolePermission.findAll({
        where: { rol_id: user.rol_id },
        attributes: ['permiso_id']
    });

    // Extraemos los permisos del resultado
    const permisos = rolePermissions.map(rp => rp.permiso_id);

    // Generamos el token de autenticación
    const token = jwt.sign(
        { id: user.id, rol_id: user.rol_id, permisos },
        SECRET_KEY,
        { expiresIn: '1h' } // El token expira en una hora
    );

    // Devolvemos el token y los permisos
    return { token, permisos };
};