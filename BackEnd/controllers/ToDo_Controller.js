const {
  findAllToDosFromFolderService,
  createToDoService,
  deleteToDoService,
  updateToDoService,
} = require("../services/ToDo_Services");
const { toDoAlreadyExists } = require("../utils/databases/CheckDatabase");

module.exports = {
  getAllToDosFromFolder: async function (req, res, next) {
    const toDos = await findAllToDosFromFolderService(req.params.folderId);
    return { code: 200, toDos: toDos };
  },

  addToDo: async function (req, res, next) {
    const newToDo = await createToDoService(
      req.body.title,
      req.body.description,
      req.body.FolderId
    );
    return { code: 201, newToDo: newToDo };
  },

  deleteToDo: async function (req, res, next) {
    await deleteToDoService(req.params.id);
    return { code: 200 };
  },

  updateToDo: async function (req, res, next) {
    const toDoList = await findAllToDosFromFolderService(req.body.folderId);
    const alreadyExist = toDoAlreadyExists(
      req.body.title,
      req.params.id,
      toDoList
    );
    if (!alreadyExist) {
      const updatedToDo = await updateToDoService(
        req.params.id,
        req.body.title,
        req.body.description,
        req.body.marked,
        req.body.folderId
      );
      return { code: 200, toDo: updatedToDo };
    } else {
      return { code: 452, toDo: null };
    }
  },

  updateToDoMark: async function (req, res, next) {
    const updatedToDo = await updateToDoService(
      req.params.id,
      req.body.title,
      req.body.description,
      req.body.marked,
      req.body.folderId
    );
    return { code: 200, toDo: updatedToDo };
  },
};
