//maintenanceUnitRouter.js

let maintenanceUnitRouter = require('express').Router();
var maintenanceUnitController = require('../controllers/maintenanceUnitController');

//Generic requests
maintenanceUnitRouter.get('/', maintenanceUnitController.index);
maintenanceUnitRouter.get('/:id_unit', maintenanceUnitController.view);
maintenanceUnitRouter.post('/', maintenanceUnitController.new);
maintenanceUnitRouter.put('/:id_unit', maintenanceUnitController.update);
maintenanceUnitRouter.delete('/:id_unit', maintenanceUnitController.delete);

//Peculiar requests


module.exports = maintenanceUnitRouter;