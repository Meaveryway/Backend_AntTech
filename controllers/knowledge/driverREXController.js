//DriverREXController.js
// TODO: Post actions field validation


var database = require('../../utilities/databaseAccess');
var DriverREX = require('../../models/knowledge/driverREXModel');
var parser = require('../../utilities/urlAttributeExtractor');
let status = require('../../utilities/constants');
let logger = require('../../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM driver_rex ORDER BY id';

    logger.logExceptOnTest(`Indexing driver REXs.`);
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
    let id = parser.URLParse.param_idDriverREX();

    statement = 'SELECT * FROM driver_rex WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing driver REX with ID = ${id}.`);
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
    var driverREX_temp = new DriverREX(0, parser.URLParse.idUseSheet(), parser.URLParse.description(), parser.URLParse.date(), parser.URLParse.criticality(), parser.URLParse.state());

    statement = 'INSERT INTO driver_rex (id_sheet, description, date, level, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    values = [driverREX_temp.idSheet, driverREX_temp.description, driverREX_temp.date, driverREX_temp.criticalityLevel, driverREX_temp.status];

    logger.logExceptOnTest("Inserting new driver REX.");
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
    let id = parser.URLParse.param_idDriverREX()
    var driverREX_temp = new DriverREX(0, parser.URLParse.idUseSheet(), parser.URLParse.description(), parser.URLParse.date(), parser.URLParse.criticality(), parser.URLParse.state());

    statement = 'UPDATE driver_rex SET id_sheet = $1, description = $2, date = $3, level = $4, status = $5 WHERE id = $6';
    values = [driverREX_temp.idSheet, driverREX_temp.description, driverREX_temp.date, driverREX_temp.criticalityLevel, driverREX_temp.status, id];

    logger.logExceptOnTest(`Updating driver REX with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else
            response.status(status.success).json(`Driver REX with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idDriverREX();

    statement = 'DELETE FROM driver_rex WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting driver REX with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Driver REX with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries

exports.updateState = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idDriverREX();
    let state = parser.URLParse.param_state();

    statement = 'UPDATE driver_rex SET status = $1 WHERE id = $2';
    values = [state, id];

    logger.logExceptOnTest(`Updating state to ${state} for driver's return of experience with ID = ${id}`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Status of driver's REX with ID = ${id} was updated to ${state}.`);
    })
};