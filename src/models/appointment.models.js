import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { Times } from "./time.models.js";
import { Users } from "./user.models.js";

export const Appointments = sequelize.define(
    'Appointments',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        time_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Times, key: 'id' }
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Users, key: 'id' }
        },
        specialist_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Users, key: 'id' }
        }
    }
)