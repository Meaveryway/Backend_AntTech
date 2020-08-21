//controlRouter.js

let controlRouter = require('express').Router();
let controlController = require('../controllers/controlController');

//Generic requests
controlRouter.get('/', controlController.index);
controlRouter.get('/:id_control', controlController.view);
controlRouter.post('/', controlController.new);
controlRouter.put('/:id_control', controlController.update);
controlRouter.delete('/:id_control', controlController.delete);

//Peculiar requests


module.exports = controlRouter;