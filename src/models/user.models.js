import { sequelize , DataTypes } from "../database/database";

const Users = sequelize.define(
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
        lvl: { /* Exists 3 levels of permission: 1- Patients. 2- Specialist. 3- Admin. */
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1 /* Reference in admin-levels table */
        }
    }
)

