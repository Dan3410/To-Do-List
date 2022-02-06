const ToDo_Model = require("../models/To-Do_Model");

function modifyRes(res, status, message, data) {
  res.json({
    status: status,
    message: message,
    data: data,
  });
}

module.exports = {
  getAllToDos: async function (req, res, next) {
    try {
      const ToDoList = await ToDo_Model.findAll();
      modifyRes(res, "Success", "ToDos retrieved", ToDoList);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
  addToDo: async function (req, res, next) {
    try {
      await ToDo_Model.create({
        title: req.body.title,
        description: req.body.description,
        marked: false
      });
      modifyRes(res, "Success", "ToDo created!", null);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
  deleteToDo: async function (req, res, next) {
    try {
      await ToDo_Model.destroy({
        where: {
          id: req.params.id,
        },
      });
      modifyRes(res, "Success", "ToDo deleted", null);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
  updateToDo: async function (req, res, next) {
    try {
      await ToDo_Model.update(
        { title: req.body.title, description: req.body.description },
        { where: { id: req.params.id } }
      );
      modifyRes(res, "Success", "ToDo updated", null);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
};
