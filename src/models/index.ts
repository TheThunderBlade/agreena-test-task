'use strict';

import fs from 'fs';
import path from 'path';
import {Sequelize, DataTypes} from 'sequelize';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
import { createNamespace } from 'cls-hooked';
const db: any = {};

export let sequelize: any = new Sequelize(
    config?.database || process.env.DB_NAME,
    config?.username || process.env.DB_USER,
    config?.password || process.env.DB_PASSWORD,
    {
        host: config?.host || process.env.DB_HOST,
        dialect: config?.dialect || 'postgres',
    });

export const namespace = createNamespace('ns');
Sequelize.useCLS(namespace);

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
