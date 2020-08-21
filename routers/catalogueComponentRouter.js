//catalogueComponentRouter.js

let catalogueComponentRouter = require('express').Router();
var catalogueComponentController = require('../controllers/catalogueComponentController');

//Generic requests
catalogueComponentRouter.get('/', catalogueComponentController.index);
catalogueComponentRouter.get('/:id_catalogue', catalogueComponentController.view);
catalogueComponentRouter.post('/', catalogueComponentController.new);
catalogueComponentRouter.put('/:id_catalogue', catalogueComponentController.update);
catalogueComponentRouter.delete('/:id_catalogue', catalogueComponentController.delete);

//Peculiar requests
catalogueComponentRouter.put('/:id_catalogue/threshold/:threshold_used', catalogueComponentController.updateThresholdUsed);
catalogueComponentRouter.put('/:id_catalogue/threshold/rex/:threshold_rex', catalogueComponentController.updateThresholdREX);
catalogueComponentRouter.put('/:id_catalogue/threshold/handbook/:threshold_handbook', catalogueComponentController.updateThresholdHandbook);
//
module.exports = catalogueComponentRouter;