const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/database');

// Define el modelo de usuario
const User = sequelize.define('usuarios', {
    // Identificador único del usuario
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    // Nombre del usuario
    nombre: { type: DataTypes.STRING, allowNull: false },
    // Correo electrónico del usuario
    email: { type: DataTypes.STRING, allowNull: false, unique: true }, 
    // Contraseña del usuario (se almacenará encriptada)
    password: { type: DataTypes.STRING, allowNull: false },
    // Identificador del rol del usuario
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Referencia a la tabla roles
        references: { model: 'roles', key: 'id' }
    },
    // Identificador del administrador que creó el usuario (opcional)
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // Referencia a la tabla usuarios (el administrador que creó el usuario)
        references: { model: 'usuarios', key: 'id' }
    }
}, {
        timestamps: false,
        tableName: 'usuarios',
});

// Exporta el modelo de usuario
module.exports = User;
