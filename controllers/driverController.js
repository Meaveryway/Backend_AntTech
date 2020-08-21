//driverController.js
// TODO: Post actions field validation


var database = require('../utilities/databaseAccess');
var Driver = require('../models/driverModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM driver ORDER BY id';

    logger.logExceptOnTest(`Indexing drivers.`);
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
    let id = parser.URLParse.param_idDriver();

    statement = 'SELECT * FROM driver WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing driver with ID = ${id}.`);
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
    var driver_temp = new Driver(0, parser.URLParse.fullname(), parser.URLParse.birthdate(), parser.URLParse.idOperationalUnit());

    statement = 'INSERT INTO driver (fullname, birthdate, id_unit) VALUES ($1, $2, $3) RETURNING *';
    values = [driver_temp.fullName, driver_temp.birthdate, driver_temp.idUnit];

    logger.logExceptOnTest("Inserting new driver.");
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
    let id = parser.URLParse.param_idDriver()
    var driver_temp = new Driver(0, parser.URLParse.fullname(), parser.URLParse.birthdate(), parser.URLParse.idOperationalUnit());

    statement = 'UPDATE driver SET fullname = $1, birthdate = $2, id_unit = $3 WHERE id = $4';
    values = [driver_temp.fullName, driver_temp.birthdate, driver_temp.idUnit, id];

    logger.logExceptOnTest(`Updating driver with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Driver with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idDriver();

    statement = 'DELETE FROM driver WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting driver with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Driver with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries