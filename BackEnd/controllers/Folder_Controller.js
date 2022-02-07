const {
  createFolderService,
  deleteFolderService,
  getAllFoldersService,
} = require("../services/Folder_Services");
const { deleteToDosFromFolderService } = require("../services/ToDo_Services");

function modifyRes(res, status, message, data) {
  res.json({
    status: status,
    message: message,
    data: data,
  });
}

module.exports = {
  createFolder: async function (req, res, next) {
    try {
      const newFolder = await createFolderService(req.body.title);
      modifyRes(res, "Success", "FolderCreated", newFolder);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
  deleteFolder: async function (req, res, next) {
    try {
      await deleteToDosFromFolderService(req.params.id);
      await deleteFolderService(req.params.id);
      modifyRes(res, "Success", "Folder deleted", null);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
  getAllFolders: async function (req, res, next) {
    try {
      const folders = await getAllFoldersService(req.params.id);
      modifyRes(res, "Success", "Folders retrieved", folders);
    } catch (error) {
      console.log(error.message);
      modifyRes(res, "Error", error.message, null);
    }
  },
};
