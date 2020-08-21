//MechanicREXController.js
// TODO: Post actions field validation


var database = require('../../utilities/databaseAccess');
var MechanicREX = require('../../models/knowledge/mechanicREXModel');
var parser = require('../../utilities/urlAttributeExtractor');
let status = require('../../utilities/constants');
let logger = require('../../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM mechanic_rex ORDER BY id';

    logger.logExceptOnTest(`Indexing mechanic REXs.`);
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
    let id = parser.URLParse.param_idMechanicREX();

    statement = 'SELECT * FROM mechanic_rex WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing mechanic REX with ID = ${id}.`);
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
    var mechanicREX_temp = new MechanicREX(0, parser.URLParse.description(), parser.URLParse.type(), parser.URLParse.state(), parser.URLParse.date(), parser.URLParse.idMaintenanceSheet());

    statement = 'INSERT INTO mechanic_rex (date, description, type, status, id_sheet) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    values = [mechanicREX_temp.date, mechanicREX_temp.description, mechanicREX_temp.type, mechanicREX_temp.status, mechanicREX_temp.idSheet];

    logger.logExceptOnTest("Inserting new mechanic REX.");
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
    let id = parser.URLParse.param_idMechanicREX()
    var mechanicREX_temp = new MechanicREX(0, parser.URLParse.description(), parser.URLParse.type(), parser.URLParse.state(), parser.URLParse.date(), parser.URLParse.idMaintenanceSheet());

    statement = 'UPDATE mechanic_rex SET date = $1, description = $2, type = $3, status = $4, id_sheet = $5 WHERE id = $6';
    values = [mechanicREX_temp.date, mechanicREX_temp.description, mechanicREX_temp.type, mechanicREX_temp.status, mechanicREX_temp.idSheet, id];

    logger.logExceptOnTest(`Updating mechanic REX with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else
            response.status(status.success).json(`Mechanic REX with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idMechanicREX();

    statement = 'DELETE FROM mechanic_rex WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting mechanicREX with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Mechanic REX with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries

exports.updateState = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idMechanicREX();
    let state = parser.URLParse.param_state();

    statement = 'UPDATE mechanic_rex SET status = $1 WHERE id = $2';
    values = [state, id];

    logger.logExceptOnTest(`Updating state to ${state} for mechanic's return of experience with ID = ${id}`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Status of mechanic's REX with ID = ${id} was updated to ${state}.`);
    })
};