//defaultComponentController.js
// TODO: Post actions field validation


var database = require('../utilities/databaseAccess');
var DefaultComponent = require('../models/defaultComponentModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM default_component ORDER BY id';

    logger.logExceptOnTest(`Indexing all default components.`);
    database.pgConnetion.query(statement, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rows[0] == null)
            response.status(status.nocontent).send("Empty table.");
        else
            response.status(status.success).json(results.rows)
    })
}

exports.view = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idDefaultCatalogueVehicle();

    statement = 'SELECT * FROM catalogue_component WHERE id IN (select id_component FROM default_component WHERE id_vehicle = $1) ORDER BY  id';
    values = [id];

    logger.logExceptOnTest(`Viewing default components associated to vehicle model with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rows[0] == null)
            response.status(status.nocontent).send("Empty table.");
        else
            response.status(status.success).json(results.rows);
    })
}
exports.new = function(request, response) {
    parser.URLParse(request);
    var default_temp = new DefaultComponent(0, parser.URLParse.idDefaultCatalogueVehicle(), parser.URLParse.idDefaultCatalogueComponent());

    statement = 'INSERT INTO default_component (id_vehicle, id_component) VALUES ($1, $2) RETURNING *';
    values = [default_temp.idCatalogueVehicle, default_temp.idCatalogueComponent];

    logger.logExceptOnTest("Inserting new default component relation.");
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else
            response.status(status.success).json(results.rows[0]);
    })
}

exports.deleteByVehicle = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idDefaultCatalogueVehicle();

    statement = 'DELETE FROM default_component WHERE id_vehicle = $1';
    values = [id];

    logger.logExceptOnTest("Deleting all default components associated with vehicle model having ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Default component of vehicle model having ID = ${id} were deleted.`);
    })
}

exports.deleteByComponent = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idDefaultCatalogueComponent();

    statement = 'DELETE FROM default_component WHERE id_component = $1';
    values = [id];

    logger.logExceptOnTest("Deleting all default components associated with component model having ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Default component of component model having ID = ${id} were deleted.`);
    })
}

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idDefault();

    statement = 'DELETE FROM default_component WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting default component having ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Default component having ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries