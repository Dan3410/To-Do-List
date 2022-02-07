const express = require('express');
const router = express.Router();
const Folder_Controller = require('../controllers/Folder_Controller')

router.get('/',Folder_Controller.getAllFolders);
router.post('/',Folder_Controller.createFolder);
router.delete('/:id',Folder_Controller.deleteFolder);


module.exports = router;