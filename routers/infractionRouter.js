//infractionRouter.js

let infractionRouter = require('express').Router();
var infractionController = require('../controllers/infractionController');

//Generic requests
infractionRouter.get('/', infractionController.index);
infractionRouter.get('/:id_infraction', infractionController.view);
infractionRouter.post('/', infractionController.new);
infractionRouter.put('/:id_infraction', infractionController.update);
infractionRouter.delete('/:id_infraction', infractionController.delete);

//Peculiar requests


module.exports = infractionRouter;