//catalogueVehicleRouter.js

let catalogueVehicleRouter = require('express').Router();
var catalogueVehicleController = require('../controllers/catalogueVehicleController');

//Generic requests
catalogueVehicleRouter.get('/', catalogueVehicleController.index);
catalogueVehicleRouter.get('/:id_catalogue', catalogueVehicleController.view);
catalogueVehicleRouter.post('/', catalogueVehicleController.new);
catalogueVehicleRouter.put('/:id_catalogue', catalogueVehicleController.update);
catalogueVehicleRouter.delete('/:id_catalogue', catalogueVehicleController.delete);

//Peculiar requests


module.exports = catalogueVehicleRouter;