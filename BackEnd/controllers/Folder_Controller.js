const {
  createFolderService,
  deleteFolderService,
  getAllFoldersService,
} = require("../services/Folder_Services");
const { deleteToDosFromFolderService } = require("../services/ToDo_Services");

module.exports = {
  createFolder: async function (req, res, next) {
    const newFolder = await createFolderService(req.body.title);
    return { code: 201, folder: newFolder };
  },

  deleteFolder: async function (req, res, next) {
    await deleteToDosFromFolderService(req.params.id);
    await deleteFolderService(req.params.id);
    return { code: 200 };
  },

  getAllFolders: async function (req, res, next) {
    const folders = await getAllFoldersService(req.params.id);
    return { code: 200, folders: folders };
  },
};
