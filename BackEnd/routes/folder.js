const express = require("express");
const router = express.Router();
const Folder_Controller = require("../controllers/Folder_Controller");
const { modifyRes, sendErrorServer } = require("../utils/responses/responses");

router.get("/", (req, res) => {
  Folder_Controller.getAllFolders(req).then(
    (response) => {
      modifyRes(res, response.code, "ToDos retrieved", response.folders);
    },
    () => sendErrorServer(res)
  );
});

router.post("/", (req, res) => {
  Folder_Controller.createFolder(req).then(
    (response) => {
      console.log(response);
      modifyRes(res, response.code, "Folder created", response.folder);
    },
    () => sendErrorServer(res)
  );
});

router.delete("/:id", (req, res) => {
  Folder_Controller.deleteFolder(req).then(
    (response) => modifyRes(res, response.code, "Folder deleted", null),
    () => sendErrorServer(res)
  );
});

module.exports = router;
