import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';

export const Times = sequelize.define(
    'Times', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        time:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }   
)