//mechanicREXRouter.js

let mechanicREXRouter = require('express').Router();
var mechanicREXController = require('../../controllers/knowledge/mechanicREXController');

//Generic requests
mechanicREXRouter.get('/', mechanicREXController.index);
mechanicREXRouter.get('/:id_mechanic_rex', mechanicREXController.view);
mechanicREXRouter.post('/', mechanicREXController.new);
mechanicREXRouter.put('/:id_mechanic_rex', mechanicREXController.update);
mechanicREXRouter.delete('/:id_mechanic_rex', mechanicREXController.delete);

//Peculiar requests

mechanicREXRouter.put('/:id_mechanic_rex/state/:state', mechanicREXController.updateState);

module.exports = mechanicREXRouter;