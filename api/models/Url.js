const { sequelize, Sequelize } = require('../../config/sequelize');

const Url = sequelize.define('Url', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  longUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  numLogs: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Url;
