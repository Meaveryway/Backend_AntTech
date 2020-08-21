//maintenanceSheetRouter.js

let maintenanceSheetRouter = require('express').Router();
var maintenanceSheetController = require('../../controllers/files/maintenanceSheetController');

//Generic requests
maintenanceSheetRouter.get('/', maintenanceSheetController.index);
maintenanceSheetRouter.get('/:id_sheet', maintenanceSheetController.view);
maintenanceSheetRouter.post('/', maintenanceSheetController.new);
maintenanceSheetRouter.put('/:id_sheet', maintenanceSheetController.update);
maintenanceSheetRouter.delete('/:id_sheet', maintenanceSheetController.delete);

//Peculiar requests


module.exports = maintenanceSheetRouter;