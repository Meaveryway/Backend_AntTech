//vehicleController.js
// TODO: Post actions field validation


var database = require('../utilities/databaseAccess');
var Vehicle = require('../models/vehicleModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM vehicle ORDER BY id';

    logger.logExceptOnTest(`Indexing vehicles.`);
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
    let id = parser.URLParse.param_idVehicle();

    statement = 'SELECT * FROM vehicle WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing vehicle with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rows.length < 1) {
            response.status(status.nocontent).send("No element with such ID");
        } else
            response.status(status.success).json(results.rows);

    })
}

exports.new = function(request, response) {
    parser.URLParse(request);
    var vehicle_temp = new Vehicle(0, parser.URLParse.idCatalogueVehicle(), parser.URLParse.regNumber(), parser.URLParse.odometer(), parser.URLParse.state(), parser.URLParse.dateRelease(), parser.URLParse.idOperationalUnit());

    statement = 'INSERT INTO vehicle (reg_number, id_catalogue, odometer, state, date_release, id_unit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    values = [vehicle_temp.regNumber, vehicle_temp.idCatalogue, vehicle_temp.odometer, vehicle_temp.state, vehicle_temp.dateRelease, vehicle_temp.idUnit];

    logger.logExceptOnTest("Inserting new vehicle.");
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else {
            response.status(status.success).json(results.rows[0]); //send(`Vehicle added to the database with ID = ${results.rows[0].id}`);
        }
    })
}

exports.update = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idVehicle()
    var vehicle_temp = new Vehicle(0, parser.URLParse.idCatalogueVehicle(), parser.URLParse.regNumber(), parser.URLParse.odometer(), parser.URLParse.state(), parser.URLParse.dateRelease(), parser.URLParse.idOperationalUnit());

    statement = 'UPDATE vehicle SET reg_number = $1, id_catalogue = $2, odometer = $3, state = $4, date_release = $5, id_unit = $6 WHERE id = $7';
    values = [vehicle_temp.regNumber, vehicle_temp.idCatalogue, vehicle_temp.odometer, vehicle_temp.state, vehicle_temp.dateRelease, vehicle_temp.idUnit, id];

    logger.logExceptOnTest(`Updating vehicle with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No vehicle with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Vehicle with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idVehicle();

    statement = 'DELETE FROM vehicle WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting vehicle with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No vehicle with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Vehicle with ID = ${id} was deleted.` + results.rowCount);
    })
}

//------------------------------------------------------------ Peculiar queries

exports.updateOdometer = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idVehicle();
    let odometer = parser.URLParse.param_odometer();

    statement = 'UPDATE vehicle SET odometer = $1 WHERE id = $2';
    values = [odometer, id];

    logger.logExceptOnTest("Updating Km counter to", odometer, "km for vehicle with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No vehicle with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Odometer of Vehicle with ID = ${id} was updated to ${odometer}km.`);
    })
};

exports.updateState = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idVehicle();
    let state = parser.URLParse.param_state();

    statement = 'UPDATE vehicle SET state = $1 WHERE id = $2';
    values = [state, id];

    logger.logExceptOnTest(`Updating state to ${state} for vehicle with ID = ${id}`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No vehicle with ID = ${id} was found.`);
        else
            response.status(status.success).json(`State of Vehicle with ID = ${id} was updated to ${state}.`);
    })
};