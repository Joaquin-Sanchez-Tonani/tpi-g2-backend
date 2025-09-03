import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('medical_clinic', 'postgres', 'JN15Mosk', {
  host: 'localhost',
  port: 4000,   
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  }
});
