const {
  findAllToDosFromFolderService,
  createToDoService,
  deleteToDoService,
  updateToDoService,
} = require("../services/ToDo_Services");
const { toDoAlreadyExists } = require("../utils/databases/CheckDatabase");

function modifyRes(res, status, message, data) {
  res.json({
    status: status,
    message: message,
    data: data,
  });
}

module.exports = {
  getAllToDosFromFolder: async function (req, res, next) {
    try {
      const ToDoList = await findAllToDosFromFolderService(req.params.folderId);
      modifyRes(res, "Success", "ToDos retrieved", ToDoList);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
  addToDo: async function (req, res, next) {
    try {
      const toDo = await createToDoService(
        req.body.title,
        req.body.description,
        req.body.FolderId
      );
      modifyRes(res, "Success", "ToDo created!", toDo);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
  deleteToDo: async function (req, res, next) {
    try {
      await deleteToDoService(req.params.id);
      modifyRes(res, "Success", "ToDo deleted", null);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
  updateToDo: async function (req, res, next) {
    try {
      const toDoList = await findAllToDosFromFolderService(req.body.folderId);
      toDoAlreadyExists(req.body.title,toDoList);
      await updateToDoService(
        req.params.id,
        req.body.title,
        req.body.description,
        req.body.marked
      );
      modifyRes(res, "Success", "ToDo updated", null);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
};
