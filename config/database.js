const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

function toSequelizeCli(mysql) {
  return {
    username: mysql.username,
    password: mysql.password,
    database: mysql.database,
    host: mysql.host,
    port: mysql.port,
    dialect: 'mysql',
  };
}

module.exports = {
  development: toSequelizeCli(development.mysql),
  test: toSequelizeCli(test.mysql),
  production: toSequelizeCli(production.mysql),
};
