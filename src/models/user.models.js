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
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
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
            type: DataTypes.STRING
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: { model: Roles, key: 'id' },
            onDelete: 'CASCADE',  // si borrás el User, se borra el Specialist
            onUpdate: 'CASCADE'   // si cambias el id del User, se actualiza aquí
        }
    }
)

