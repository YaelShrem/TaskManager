const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tasks = require("./task.js")(sequelize, Sequelize);

module.exports = db;
// const { Sequelize } = require('sequelize');
// const User = require('./user');
// const Task = require('./task');
// const { database } = require('../config');

// const sequelize = new Sequelize(
//   database.database,
//   database.username,
//   database.password,
//   {
//     host: database.host,
//     dialect: 'mysql',
//   }
// );

// // Define model associations
// Task.belongsTo(User);
// User.hasMany(Task);

// module.exports = {
//     sequelize,
//     User,
//     Task,
// };