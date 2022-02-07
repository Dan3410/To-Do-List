const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

const sequelize = new Sequelize("toDoDB", "toDoUser", "password", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
});

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
    marked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {}
);

const Folder_Model = sequelize.define(
  "Folder",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {}
);

Folder_Model.hasMany(ToDo_Model, {as: "ToDo"})
sequelize.sync()

//sequelize.sync({force: true});
module.exports = {ToDo_Model,Folder_Model};
