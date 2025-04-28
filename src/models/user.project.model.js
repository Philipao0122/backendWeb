const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


// Modelo para la tabla de muchos a muchos entre usuarios y proyectos
const UserProject = sequelize.define('usuarios_proyectos', {
    // Identificador único para cada registro en la tabla
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // Identificador del usuario que se asocia con un proyecto
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' } // Referencia a la tabla de usuarios
    },
    // Identificador del proyecto que se asocia con un usuario
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'proyectos', key: 'id' } // Referencia a la tabla de proyectos
    },
}, {
    timestamps: false, // No se incluyen columnas de fecha de creación y modificación
    tableName: 'usuarios_proyectos' // Nombre de la tabla en la base de datos
});

module.exports = UserProject;