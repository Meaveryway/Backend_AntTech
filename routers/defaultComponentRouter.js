//defaultComponentRouter.js

let defaultComponentRouter = require('express').Router();
let defaultComponentController = require('../controllers/defaultComponentController');

//Generic requests
defaultComponentRouter.get('/', defaultComponentController.index);
defaultComponentRouter.get('/:id_vehicle', defaultComponentController.view);
defaultComponentRouter.post('/', defaultComponentController.new);
defaultComponentRouter.delete('/:id_default', defaultComponentController.delete);
defaultComponentRouter.delete('/vehicle/:id_vehicle', defaultComponentController.deleteByVehicle);
defaultComponentRouter.delete('/component/:id_component', defaultComponentController.deleteByComponent);

//Peculiar requests


module.exports = defaultComponentRouter;