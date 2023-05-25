const bcrypt = require('bcrypt');
module.exports = (sequelize, Sequelize)=>{
const User = sequelize.define('User', {
  // id: {
  //   type: Sequelize.UUID,
  //   defaultValue: Sequelize.UUIDV4,
  //   primaryKey: true
  // },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Hash password before saving
User.beforeCreate(async (user) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

// Verify password
User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
    return User;
}

