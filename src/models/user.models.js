import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Roles } from "./role.models.js";

export const Users = sequelize.define(
    'Users',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail:true}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        licenseNumber: { 
            type: DataTypes.STRING, 
            allowNull: true 
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Roles, key: 'id' },
            onDelete: 'CASCADE',  // si borrás el User, se borra el Specialist
            onUpdate: 'CASCADE'   // si cambias el id del User, se actualiza aquí
        }
    }
)

