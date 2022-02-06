const { Sequelize, DataTypes } = require("sequelize");

module.exports = {
  generateToDoModel: async function (sequelize) {
    ToDo_Model = sequelize.define(
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
    await ToDo_Model.sync();
  },
};
