//driverREXRouter.js

let driverREXRouter = require('express').Router();
var driverREXController = require('../../controllers/knowledge/driverREXController');

//Generic requests
driverREXRouter.get('/', driverREXController.index);
driverREXRouter.get('/:id_driver_rex', driverREXController.view);
driverREXRouter.post('/', driverREXController.new);
driverREXRouter.put('/:id_driver_rex', driverREXController.update);
driverREXRouter.delete('/:id_driver_rex', driverREXController.delete);

//Peculiar requests
driverREXRouter.put('/:id_driver_rex/state/:state', driverREXController.updateState);


module.exports = driverREXRouter;