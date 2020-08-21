//useSpeedRouter.js

let useSpeedRouter = require('express').Router();
var useSpeedController = require('../../controllers/files/useSpeedController');

//Generic requests
useSpeedRouter.get('/', useSpeedController.index);
useSpeedRouter.get('/:id_sheet', useSpeedController.view);
useSpeedRouter.post('/', useSpeedController.new);
useSpeedRouter.delete('/:id_sheet', useSpeedController.delete);

//Peculiar requests


module.exports = useSpeedRouter;