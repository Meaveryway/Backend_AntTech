//maintenanceSheetController.js
// TODO: Post actions field validation


var database = require('../../utilities/databaseAccess');
var MaintenanceSheet = require('../../models/files/maintenanceSheetModel');
var parser = require('../../utilities/urlAttributeExtractor');
let status = require('../../utilities/constants');
let logger = require('../../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM maintenance_sheet ORDER BY id';

    logger.logExceptOnTest(`Indexing maintenance sheets.`);
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
    let id = parser.URLParse.param_idMaintenanceSheet();

    statement = 'SELECT * FROM maintenance_sheet WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing maintenance sheet with ID = ${id}.`);
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
    var maintenanceSheet_temp = new MaintenanceSheet(0, parser.URLParse.idMaintenanceUnit(), parser.URLParse.idVehicle(), parser.URLParse.dateEntry(), parser.URLParse.dateExit());

    statement = 'INSERT INTO maintenance_sheet (id_unit, id_vehicle, date_entry, date_exit) VALUES ($1, $2, $3, $4) RETURNING *';
    values = [maintenanceSheet_temp.idUnit, maintenanceSheet_temp.idVehicle, maintenanceSheet_temp.dateEntry, maintenanceSheet_temp.dateExit];

    logger.logExceptOnTest("Inserting new maintenance sheet.");
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else
            response.status(status.success).json(results.rows[0]);
    })
}

exports.update = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idMaintenanceSheet()
    var maintenanceSheet_temp = new MaintenanceSheet(0, parser.URLParse.idMaintenanceUnit(), parser.URLParse.idVehicle(), parser.URLParse.dateEntry(), parser.URLParse.dateExit());

    statement = 'UPDATE maintenance_sheet SET id_unit = $1, id_vehicle = $2, date_entry = $3, date_exit = $4 WHERE id = $5';
    values = [maintenanceSheet_temp.idUnit, maintenanceSheet_temp.idVehicle, maintenanceSheet_temp.dateEntry, maintenanceSheet_temp.dateExit, id];

    logger.logExceptOnTest(`Updating maintenance sheet with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Maintenance sheet with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idMaintenanceSheet();

    statement = 'DELETE FROM maintenance_sheet WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting maintenance sheet with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Maintenance sheet with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries