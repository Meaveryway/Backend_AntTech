//instructionInterchangeRouter.js

let instructionInterchangeRouter = require('express').Router();
var instructionInterchangeController = require('../../controllers/knowledge/instructionInterchangeController');

//Generic requests
instructionInterchangeRouter.get('/', instructionInterchangeController.index);
instructionInterchangeRouter.get('/:id_interchange', instructionInterchangeController.view);
instructionInterchangeRouter.post('/', instructionInterchangeController.new);
instructionInterchangeRouter.put('/:id_interchange', instructionInterchangeController.update);
instructionInterchangeRouter.delete('/:id_interchange', instructionInterchangeController.delete);

//Peculiar requests


module.exports = instructionInterchangeRouter;