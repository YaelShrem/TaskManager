module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Task;
  };


// const { DataTypes } = require('sequelize');
// const sequelize = require('./index');

// const Task = sequelize.define('Task', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   imagePath: {
//     type: DataTypes.STRING,
//   },
// });

// module.exports = Task;
