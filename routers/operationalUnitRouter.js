//operationalUnitRouter.js

let operationalUnitRouter = require('express').Router();
var operationalUnitController = require('../controllers/operationalUnitController');

//Generic requests
operationalUnitRouter.get('/', operationalUnitController.index);
operationalUnitRouter.get('/:id_unit', operationalUnitController.view);
operationalUnitRouter.post('/', operationalUnitController.new);
operationalUnitRouter.put('/:id_unit', operationalUnitController.update);
operationalUnitRouter.delete('/:id_unit', operationalUnitController.delete);

//Peculiar requests


module.exports = operationalUnitRouter;