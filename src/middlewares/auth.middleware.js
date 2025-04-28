const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Llave secreta para la creación y verificación de tokens
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware para autenticar tokens
const authenticateToken = (req, res, next) => {
    // Depuración
    console.log('Middleware authenticateToken ejecutado');

    // Obtener el token de la cabecera de la solicitud
    const token = req.header('Authorization')?.split(' ')[1];

    // Verificar si el token fue proporcionado
    if (!token) {
        // Depuración
        console.log('No se proporcionó token');
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token'});
    }

    // Verificar el token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            // Depuración
            console.log('Error al verificar token:', err);
            return res.status(403).json({ message: 'Token no valido' });
        }

        // Agregar el usuario autenticado a la solicitud
        req.user = user;

        // Depuración
        console.log('Token verificado correctamente');
        next();
    });
};

// Middleware para verificar roles
const checkRole = (roles) => {
    return (req, res, next) => {
        // Depuración
        console.log('Middleware checkRole ejecutado');

        // Obtener el rol del usuario autenticado
        const { rol_id } = req.user;
        console.log(`Rol del usuario: ${rol_id}`);

        // Verificar si el rol del usuario es permitido
        if (!roles.includes(rol_id)) {
            // Depuración
            console.log('Acceso denegado');
            return res.status(403).json({ message: 'Acceso denegado, no tienes permiso para realizar esta acción'})
        }        

        // Continuar con la solicitud
        next();
    };
};

// Exportar los middlewares
module.exports = { authenticateToken, checkRole };