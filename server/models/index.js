const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes, Op } = require("sequelize");
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

const User = require('./user.js')(sequelize, Sequelize);
const Task = require('./task.js')(sequelize, Sequelize);

// Define model associations
User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks',
});
Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

db.users = User;
db.tasks = Task;

module.exports = db;