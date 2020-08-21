//driverRouter.js

let driverRouter = require('express').Router();
var driverController = require('../controllers/driverController');

//Generic requests
driverRouter.get('/', driverController.index);
driverRouter.get('/:id_driver', driverController.view);
driverRouter.post('/', driverController.new);
driverRouter.put('/:id_driver', driverController.update);
driverRouter.delete('/:id_driver', driverController.delete);

//Peculiar requests


module.exports = driverRouter;