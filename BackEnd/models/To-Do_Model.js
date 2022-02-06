const { DataTypes } = require("sequelize");
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

module.exports = ToDo_Model;
