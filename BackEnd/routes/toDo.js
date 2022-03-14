const express = require("express");
const router = express.Router();
const ToDo_Controller = require("../controllers/ToDo_Controller");
const { modifyRes, sendClientError,sendErrorServer } = require("../utils/responses/responses");

router.get("/:folderId", (req, res) =>
  ToDo_Controller.getAllToDosFromFolder(req).then(
    (response) =>
      modifyRes(res, response.code, "ToDos retrieved", response.toDos),
    () => sendErrorServer(res)
  )
);

router.post("/", (req, res) =>
  ToDo_Controller.addToDo(req).then(
    (response) =>
      modifyRes(res, response.code, "ToDo created!", response.newToDo),
    () => sendErrorServer(res)
  )
);

router.delete("/:id", (req, res) =>
  ToDo_Controller.deleteToDo(req).then(
    (response) => modifyRes(res, response.code, "ToDo deleted", null),
    () => sendErrorServer(res)
  )
);

router.put("/:id", (req, res) =>
  ToDo_Controller.updateToDo(req).then(
    (response) => {
      if (response.code === 200)
        modifyRes(res, response.code, "ToDo updated", response.toDo);
      else 
        sendClientError(res,response.code)
    },
    () => sendErrorServer(res)
  )
);

router.put("/mark/:id", (req, res) =>
  ToDo_Controller.updateToDoMark(req).then(
    (response) =>
      modifyRes(res, response.code, "ToDo updated", response.toDo),
    () => sendErrorServer(res)
  )
);

module.exports = router;
