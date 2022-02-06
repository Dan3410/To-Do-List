const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../bin/sequelize");

const ToDo_Model = sequelize.define(
  "To-Do",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

ToDo_Model.sync();

module.exports = ToDo_Model;
