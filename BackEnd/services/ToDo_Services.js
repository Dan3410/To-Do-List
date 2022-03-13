const { ToDo_Model } = require("../utils/databases/sequelize");

module.exports = {
  findAllToDosFromFolderService: async function (folderId) {
    return await ToDo_Model.findAll({ where: { folderId: folderId } });
  },
  createToDoService: async function (title, description, FolderId) {
    return await ToDo_Model.create({
      title: title,
      description: description,
      marked: false,
      FolderId: FolderId,
    });
  },
  deleteToDoService: async function (id) {
    await ToDo_Model.destroy({
      where: {
        id: id,
      },
    });
  },
  deleteToDosFromFolderService: async function (id) {
    await ToDo_Model.destroy({
      where: {
        FolderId: id,
      },
    });
  },

  updateToDoService: async function (id, title, description, marked) {
    await ToDo_Model.update(
      { title: title, description: description, marked: marked },
      { where: { id: id } }
    );
  },
};
