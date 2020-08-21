//componentController.js
// TODO: Post actions field validation


var database = require('../utilities/databaseAccess');
var Component = require('../models/componentModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM component ORDER BY id';

    logger.logExceptOnTest(`Indexing components.`);
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
    let id = parser.URLParse.param_idComponent();

    statement = 'SELECT * FROM component WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing component with ID = ${id}.`);
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
    var component_temp = new Component(0, parser.URLParse.idCatalogueComponent(), parser.URLParse.idVehicle(), parser.URLParse.odometerInstallation(), parser.URLParse.odometerLastControl(), parser.URLParse.dateInstallation());

    statement = 'INSERT INTO component (id_catalogue, id_vehicle, odometer_installation, odometer_last_control, date_installation) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    values = [component_temp.idCatalogue, component_temp.idVehicle, component_temp.odometerInstall, component_temp.odometerLastControl, component_temp.dateInstall];

    logger.logExceptOnTest("Inserting new component.");
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rows[0] == null)
            response.status(status.nocontent).send("Empty table.");
        else
            response.status(status.success).json(results.rows[0]);
    })
}


exports.update = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idComponent()
    var component_temp = new Component(0, parser.URLParse.idCatalogueComponent(), parser.URLParse.idVehicle(), parser.URLParse.odometerInstallation(), parser.URLParse.odometerLastControl(), parser.URLParse.dateInstallation());

    statement = 'UPDATE component SET id_catalogue = $1, id_vehicle = $2, odometer_installation = $3, odometer_last_control = $4, date_installation = $5 WHERE id = $6';
    values = [component_temp.idCatalogue, component_temp.idVehicle, component_temp.odometerInstall, component_temp.odometerLastControl, component_temp.dateInstall, id];

    logger.logExceptOnTest(`Updating component with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else
            response.status(status.success).json(`Component with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idComponent();
    statement = 'DELETE FROM component WHERE id = $1';
    values = [id];

    logger.logExceptOnTest(`Deleting component with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Component with ID = ${id} was deleted.`);
    })
}


//------------------------------------------------------------ Peculiar queries

exports.updateLastControl = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idComponent();
    let odometer = parser.URLParse.param_odometer();

    statement = 'UPDATE component SET odometer_last_control = $1 WHERE id = $2';
    values = [odometer, id];
    logger.logExceptOnTest(`Updating last control odometer to ${odometer}km for component with ID = ${id}`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Last control Km counter of component with ID = ${id} was updated to ${odometer}km.`);
    })
};