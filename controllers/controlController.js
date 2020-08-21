//controlController.js
// TODO: Post actions field validation


var database = require('../utilities/databaseAccess');
var Control = require('../models/controlModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM control ORDER BY id';

    logger.logExceptOnTest(`Indexing control operations.`);
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
    let id = parser.URLParse.param_idControl();

    statement = 'SELECT * FROM control WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing control operation with ID = ${id}.`);
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
    var control_temp = new Control(0, parser.URLParse.date(), parser.URLParse.duration(), parser.URLParse.odometer(), parser.URLParse.idMaintenanceSheet(), parser.URLParse.idComponent());

    statement = 'INSERT INTO control (odometer, date, id_componant, id_sheet, duration) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    values = [control_temp.odometer, control_temp.date, control_temp.idComponant, control_temp.idSheet, control_temp.duration];

    logger.logExceptOnTest("Inserting new control operation.");
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
    let id = parser.URLParse.param_idControl();
    var control_temp = new Control(0, parser.URLParse.date(), parser.URLParse.duration(), parser.URLParse.odometer(), parser.URLParse.idMaintenanceSheet(), parser.URLParse.idComponent());

    statement = 'UPDATE control SET odometer = $1, date = $2, id_componant = $3, id_sheet = $4, duration = $5 WHERE id = $6';
    values = [control_temp.odometer, control_temp.date, control_temp.idComponant, control_temp.idSheet, control_temp.duration, id];

    logger.logExceptOnTest(`Updating control operation with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Control operation with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idControl();

    statement = 'DELETE FROM control WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting control operation with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Control operation with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries