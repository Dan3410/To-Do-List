const express = require('express');
const router = express.Router();
const ToDo_Controller = require('../controllers/ToDo_Controller')

router.get('/',ToDo_Controller.getAllToDos);
router.post('/',ToDo_Controller.addToDo);
router.delete('/:id',ToDo_Controller.deleteToDo);
router.put('/:id',ToDo_Controller.updateToDo);


module.exports = router;