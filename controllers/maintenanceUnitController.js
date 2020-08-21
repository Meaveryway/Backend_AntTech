//maintenanceUnitController.js
// TODO: Post actions field validation


var database = require('../utilities/databaseAccess');
var MaintenanceUnit = require('../models/maintenanceUnitModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM maintenance_unit ORDER BY id';

    logger.logExceptOnTest(`Indexing maintenance units.`);
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
    let id = parser.URLParse.param_idMaintenanceUnit();

    statement = 'SELECT * FROM maintenance_unit WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing maintenance unit with ID = ${id}.`);
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
    var maintenanceUnit_temp = new MaintenanceUnit(0, parser.URLParse.designation(), parser.URLParse.city(), parser.URLParse.region(), parser.URLParse.address(), parser.URLParse.capacity(), parser.URLParse.level());

    statement = 'INSERT INTO maintenance_unit (designation, city, region, address, capacity, level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    values = [maintenanceUnit_temp.designation, maintenanceUnit_temp.city, maintenanceUnit_temp.region, maintenanceUnit_temp.address, maintenanceUnit_temp.capacity, maintenanceUnit_temp.maintenanceLevel];

    logger.logExceptOnTest("Inserting new maintenance unit.");
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
    let id = parser.URLParse.param_idMaintenanceUnit()
    var maintenanceUnit_temp = new MaintenanceUnit(0, parser.URLParse.designation(), parser.URLParse.city(), parser.URLParse.region(), parser.URLParse.address(), parser.URLParse.capacity(), parser.URLParse.level());

    statement = 'UPDATE maintenance_unit SET designation = $1, city = $2, region = $3, address = $4, capacity = $5, level = $6 WHERE id = $7';
    values = [maintenanceUnit_temp.designation, maintenanceUnit_temp.city, maintenanceUnit_temp.region, maintenanceUnit_temp.address, maintenanceUnit_temp.capacity, maintenanceUnit_temp.maintenanceLevel, id];

    logger.logExceptOnTest(`Updating maintenance unit with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Maintenance unit with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idMaintenanceUnit();

    statement = 'DELETE FROM maintenance_unit WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting maintenance unit with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Maintenance unit with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries