//componentRouter.js

let componentRouter = require('express').Router();
var componentController = require('../controllers/componentController');

//Generic requests
componentRouter.get('/', componentController.index);
componentRouter.get('/:id_component', componentController.view);
componentRouter.post('/', componentController.new);
componentRouter.put('/:id_component', componentController.update);
componentRouter.delete('/:id_component', componentController.delete);

//Peculiar requests
componentRouter.put('/:id_component/odometer/:odometer', componentController.updateLastControl);


module.exports = componentRouter;