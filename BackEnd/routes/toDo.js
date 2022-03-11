const express = require("express");
const router = express.Router();
const ToDo_Controller = require("../controllers/ToDo_Controller");
const { modifyRes, sendErrorServer } = require("../utils/responses/responses");

router.get("/:folderId", (req, res) =>
  ToDo_Controller.getAllToDosFromFolder(req).then(
    (toDos) => modifyRes(res, "Success", "ToDos retrieved", toDos),
    () => sendErrorServer(res)
  )
);

router.post("/", (req, res) =>
  ToDo_Controller.addToDo(req).then(
    (newToDo) => modifyRes(res, "Success", "ToDo created!", newToDo),
    () => sendErrorServer(res)
  )
);

router.delete("/:id", (req, res) =>
  ToDo_Controller.deleteToDo(req).then(
    () => modifyRes(res, "Success", "ToDo deleted", null),
    () => sendErrorServer(res)
  )
);

router.put("/:id", (req, res) =>
  ToDo_Controller.updateToDo(req).then(
    () => modifyRes(res, "Success", "ToDo updated", null),
    () => sendErrorServer(res)
  )
);

router.put("/mark/:id", (req, res) =>
  ToDo_Controller.updateToDoMark(req).then(
    () => modifyResError(res, "Success", "ToDo updated", null),
    (error) => sendErrorServer(res, "Error", error.message, null)
  )
);

module.exports = router;
