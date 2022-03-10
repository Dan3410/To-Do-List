const {
  createFolderService,
  deleteFolderService,
  getAllFoldersService,
} = require("../services/Folder_Services");
const { deleteToDosFromFolderService } = require("../services/ToDo_Services");

module.exports = {
  createFolder: function (req) {
    return createFolderService(req.body.title);
  },

  deleteFolder: async function (req) {
    await deleteToDosFromFolderService(req.params.id);
    await deleteFolderService(req.params.id);
  },

  getAllFolders: async function (req, res) {
    return await getAllFoldersService(req.params.id);
  },
};
