//vehicleRouter.js

let vehicleRouter = require('express').Router();
var vehicleController = require('../controllers/vehicleController');

//Generic requests
vehicleRouter.get('/', vehicleController.index);
vehicleRouter.get('/:id_vehicle', vehicleController.view);
vehicleRouter.post('/', vehicleController.new);
vehicleRouter.put('/:id_vehicle', vehicleController.update);
vehicleRouter.delete('/:id_vehicle', vehicleController.delete);

//Peculiar requests
vehicleRouter.put('/:id_vehicle/odometer/:odometer', vehicleController.updateOdometer);
vehicleRouter.put('/:id_vehicle/state/:state', vehicleController.updateState);


module.exports = vehicleRouter;