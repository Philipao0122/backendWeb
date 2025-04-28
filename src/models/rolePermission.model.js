const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo de relación entre roles y permisos
const RolePermission = sequelize.define('roles_permisos', {
    // ID del rol
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' }
    },
    // ID del permiso
    permisos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'permisos', key: 'id' }
    }
}, {
    timestamps: false, // no se crearán campos de fecha para este modelo
});

module.exports = RolePermission;