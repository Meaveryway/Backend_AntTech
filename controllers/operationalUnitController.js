//operationalUnitController.js
// TODO: Post actions field validation


var database = require('../utilities/databaseAccess');
var OperationalUnit = require('../models/operationalUnitModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM operational_unit ORDER BY id';

    logger.logExceptOnTest(`Indexing operational units.`);
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
    let id = parser.URLParse.param_idOperationalUnit();

    statement = 'SELECT * FROM operational_unit WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing operational unit with ID = ${id}.`);
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
    var operationalUnit_temp = new OperationalUnit(0, parser.URLParse.designation(), parser.URLParse.city(), parser.URLParse.region(), parser.URLParse.address(), parser.URLParse.capacity(), parser.URLParse.idMaintenanceUnit());

    statement = 'INSERT INTO operational_unit (designation, city, region, address, capacity, id_maintenance_unit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    values = [operationalUnit_temp.designation, operationalUnit_temp.city, operationalUnit_temp.region, operationalUnit_temp.address, operationalUnit_temp.capacity, operationalUnit_temp.idMaintenanceUnit];

    logger.logExceptOnTest("Inserting new operational unit.", values);
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
    let id = parser.URLParse.param_idOperationalUnit()
    var operationalUnit_temp = new OperationalUnit(0, parser.URLParse.designation(), parser.URLParse.city(), parser.URLParse.region(), parser.URLParse.address(), parser.URLParse.capacity(), parser.URLParse.idMaintenanceUnit());

    statement = 'UPDATE operational_unit SET designation = $1, city = $2, region = $3, address = $4, capacity = $5, id_maintenance_unit = $6 WHERE id = $7';
    values = [operationalUnit_temp.designation, operationalUnit_temp.city, operationalUnit_temp.region, operationalUnit_temp.address, operationalUnit_temp.capacity, operationalUnit_temp.idMaintenanceUnit, id];

    logger.logExceptOnTest(`Updating operational unit with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No operational unit with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Operational unit with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idOperationalUnit();

    statement = 'DELETE FROM operational_unit WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting operational unit with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No operational unit with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Operational unit with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries