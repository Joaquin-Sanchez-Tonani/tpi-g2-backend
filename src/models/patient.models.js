import { sequelize, DataTypes } from '../database/database.js'

const Patients = sequelize.define(
    'Patients', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',  // si borrás el User, se borra el Specialist
        onUpdate: 'CASCADE'   // si cambias el id del User, se actualiza aquí
    },
}
)
