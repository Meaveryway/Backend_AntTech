//manufacturerRouter.js

let manufacturerRouter = require('express').Router();
var manufacturerController = require('../controllers/manufacturerController');

//Generic requests
manufacturerRouter.get('/', manufacturerController.index);
manufacturerRouter.get('/:id_manufacturer', manufacturerController.view);
manufacturerRouter.post('/', manufacturerController.new);
manufacturerRouter.put('/:id_manufacturer', manufacturerController.update);
manufacturerRouter.delete('/:id_manufacturer', manufacturerController.delete);

//Peculiar requests


module.exports = manufacturerRouter;