import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";

export const Appointments = sequelize.define(
    'Appointments',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        day: {
            type: DataTypes.DATE,
            allowNull: false
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Users, key: id }
        },
        specialist_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Users, key: id }
        }
    }
)