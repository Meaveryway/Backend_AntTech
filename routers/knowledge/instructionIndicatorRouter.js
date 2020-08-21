//instructionIndicatorRouter.js

let instructionIndicatorRouter = require('express').Router();
var instructionIndicatorController = require('../../controllers/knowledge/instructionIndicatorController');

//Generic requests
instructionIndicatorRouter.get('/', instructionIndicatorController.index);
instructionIndicatorRouter.get('/:id_indicator', instructionIndicatorController.view);
instructionIndicatorRouter.post('/', instructionIndicatorController.new);
instructionIndicatorRouter.put('/:id_indicator', instructionIndicatorController.update);
instructionIndicatorRouter.delete('/:id_indicator', instructionIndicatorController.delete);

//Peculiar requests


module.exports = instructionIndicatorRouter;