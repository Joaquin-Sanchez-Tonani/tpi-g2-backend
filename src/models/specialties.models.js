import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Specialties = sequelize.define(
    'Specialties',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
)