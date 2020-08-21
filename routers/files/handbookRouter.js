//handbookRouter.js

let handbookRouter = require('express').Router();
var handbookController = require('../../controllers/files/handbookController');

//Generic requests
handbookRouter.get('/', handbookController.index);
handbookRouter.get('/:id_handbook', handbookController.view);
handbookRouter.post('/', handbookController.new);
handbookRouter.put('/:id_handbook', handbookController.update);
handbookRouter.delete('/:id_handbook', handbookController.delete);

//Peculiar requests


module.exports = handbookRouter;