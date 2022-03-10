const express = require("express");
const router = express.Router();
const ToDo_Controller = require("../controllers/ToDo_Controller");

router.get("/:folderId", (req, res) =>
  ToDo_Controller.getAllToDosFromFolder(req).then(
    (toDos) => modifyRes(res, "Success", "ToDos retrieved", toDos),
    (error) => modifyRes(res, "Error", error.message, null)
  )
);

router.post("/", (req, res) =>
  ToDo_Controller.addToDo(req).then(
    (newToDo) => modifyRes(res, "Success", "ToDo created!", newToDo),
    (error) => modifyRes(res, "Error", error.message, null)
  )
);

router.delete("/:id", (req, res) =>
  ToDo_Controller.deleteToDo(req).then(
    () => modifyRes(res, "Success", "ToDo deleted", null),
    () => modifyRes(res, "Error", error.message, null)
  )
);

router.put("/:id", (req, res) =>
  ToDo_Controller.updateToDo(req).then(
    () => modifyRes(res, "Success", "ToDo updated", null),
    () => modifyRes(res, "Error", error.message, null)
  )
);

module.exports = router;
