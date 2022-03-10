const {
  findAllToDosFromFolderService,
  createToDoService,
  deleteToDoService,
  updateToDoService,
} = require("../services/ToDo_Services");
const { toDoAlreadyExists } = require("../utils/databases/CheckDatabase");

module.exports = {
  getAllToDosFromFolder: async function (req) {
    return findAllToDosFromFolderService(req.params.folderId);
  },
  addToDo: async function (req, res, next) {
    return await createToDoService(
      req.body.title,
      req.body.description,
      req.body.FolderId
    );
  },
  deleteToDo: async function (req, res, next) {
    await deleteToDoService(req.params.id);
  },
  updateToDo: async function (req, res, next) {
    const toDoList = await findAllToDosFromFolderService(req.body.folderId);
    toDoAlreadyExists(req.body.title, req.params.id, toDoList);
    return await updateToDoService(
      req.params.id,
      req.body.title,
      req.body.description,
      req.body.marked
    );
  },
};
