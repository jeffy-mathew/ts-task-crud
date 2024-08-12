import { Sequelize } from 'sequelize';
import { TaskModel } from '../models/Task';
import { DatabaseConfig } from '../config/DatabaseConfig';

export const initializeSequelize = (config: DatabaseConfig): Sequelize => {
  return new Sequelize({
    dialect: 'postgres',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
  });
};