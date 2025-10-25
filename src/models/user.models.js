import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Roles } from "./role.models.js";
import { Specialties } from "./specialties.models.js";

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
            type: DataTypes.INTEGER,
            allowNull: true
        },
        isDisabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false  
        },
        specialty_id: { 
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: Specialties, key: 'id' },
            onDelete: 'SET NULL',  
            onUpdate: 'CASCADE'   
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: { model: Roles, key: 'id' },
            onDelete: 'SET DEFAULT',  
            onUpdate: 'CASCADE'   
        }
    }
)

