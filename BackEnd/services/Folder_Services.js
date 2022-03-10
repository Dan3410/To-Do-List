const { Folder_Model } = require("../utils/databases/sequelize");

module.exports = {
  createFolderService: async function (title) {
    return await Folder_Model.create({
      title: title,
    });
  },
  deleteFolderService: async function (id) {
    Folder_Model.destroy({
      where: {
        id: id,
      },
    });
  },

  getAllFoldersService: async function () {
    return await Folder_Model.findAll();    
  },
};
