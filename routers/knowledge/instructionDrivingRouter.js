//instructionDrivingRouter.js

let instructionDrivingRouter = require('express').Router();
var instructionDrivingController = require('../../controllers/knowledge/instructionDrivingController');

//Generic requests
instructionDrivingRouter.get('/', instructionDrivingController.index);
instructionDrivingRouter.get('/:id_driving', instructionDrivingController.view);
instructionDrivingRouter.post('/', instructionDrivingController.new);
instructionDrivingRouter.put('/:id_driving', instructionDrivingController.update);
instructionDrivingRouter.delete('/:id_driving', instructionDrivingController.delete);

//Peculiar requests


module.exports = instructionDrivingRouter;