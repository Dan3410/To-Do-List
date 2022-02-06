const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("db", "test", "password", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
});

module.exports = sequelize;
