const express = require("express");
const router = express.Router();
const Folder_Controller = require("../controllers/Folder_Controller");

function modifyRes(res, status, message, data) {
  res.json({
    status: status,
    message: message,
    data: data,
  });
}

router.get("/", (req, res) => {
  try {
    Folder_Controller.getAllFolders(req).then(
      (folders) => modifyRes(res, "Success", "ToDos retrieved", folders),
      (error) => modifyRes(res, "Error", error.message, null)
    );
  } catch {}
});

router.post("/", (req, res) => {
  Folder_Controller.createFolder(req).then(
    (newFolder) => modifyRes(res, "Success", "FolderCreated", newFolder),
    (error) => modifyRes(res, "Error", error.message, null)
  );
});

router.delete("/:id", (req, res) => {
  Folder_Controller.deleteFolder(req).then(
    () => modifyRes(res, "Success", "Folder deleted", null),
    (error) => modifyRes(res, "Error", error.message, null)
  );
});

module.exports = router;
