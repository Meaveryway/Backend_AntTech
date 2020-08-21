//useSheetRouter.js

let useSheetRouter = require('express').Router();
var useSheetController = require('../../controllers/files/useSheetController');

//Generic requests
useSheetRouter.get('/', useSheetController.index);
useSheetRouter.get('/:id_sheet', useSheetController.view);
useSheetRouter.post('/', useSheetController.new);
useSheetRouter.put('/:id_sheet', useSheetController.update);
useSheetRouter.delete('/:id_sheet', useSheetController.delete);

//Peculiar requests


module.exports = useSheetRouter;