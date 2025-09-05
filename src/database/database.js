import { Sequelize } from "sequelize";

// Conexión local de Joaquin

/*
export const sequelize = new Sequelize('medical_clinic', 'postgres', 'JN15Mosk', {
  host: 'localhost',
  port: 4000,   
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  }
});
*/

// Servidor para desarrollo

export const sequelize = new Sequelize('tgi-g2', 'consultor', 'SilkSong2025@@', {
  host: 'localhost',
  port: 4001,   
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  }
});

