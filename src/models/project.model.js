const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Modelo de Proyecto
const Proyect = sequelize.define('proyectos', {
    // Identificador único del proyecto (clave primaria)
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // Nombre del proyecto
    nombre: { type: DataTypes.STRING, allowNull: false },
    // Descripción del proyecto
    descripcion: { type: DataTypes.STRING, allowNull: false },
    // Fecha de creación del proyecto (con zona horaria ajustada)
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        set(value) {
            // Se restan 5 horas para cuadrar la zona horaria
            const date = new Date(value);
            date.setHours(date.getHours() - 5);
            this.setDataValue('fecha_creacion', date);
        }
    },
    // Identificador del administrador del proyecto (clave foránea)
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
    }
}, {
    // Sin timestamps (no se crean campos adicionales de fecha)
    timestamps: false,
    // Nombre de la tabla en la base de datos
    tableName: 'proyectos'
});

module.exports = Proyect;