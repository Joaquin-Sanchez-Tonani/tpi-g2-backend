import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres', 'postgres', 'JN15Mosk', {
  host: 'localhost',
  port: 4000,   
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  }
});
