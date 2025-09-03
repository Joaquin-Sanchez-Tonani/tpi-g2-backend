import { sequelize } from '../database/database.js'
import { DataTypes } from 'sequelize';

export const Roles = sequelize.define(
    'Roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
)
