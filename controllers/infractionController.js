//infractionController.js
// TODO: Post actions field validation


var database = require('../utilities/databaseAccess');
var infraction = require('../models/infractionModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM infraction ORDER BY id';

    logger.logExceptOnTest(`Indexing infractions.`);
    database.pgConnetion.query(statement, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rows[0] == null)
            response.status(status.nocontent).send("Empty table.");
        else {
            response.status(status.success).json(results.rows);
        }
    })
}

exports.view = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idInfraction();

    statement = 'SELECT * FROM infraction WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing infraction with ID = ${id}.`);
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
    var infraction_temp = new infraction(0, parser.URLParse.idUseSheet(), parser.URLParse.description(), parser.URLParse.type(), parser.URLParse.criticality(), parser.URLParse.localisation(), parser.URLParse.date());

    statement = 'INSERT INTO infraction (id_sheet, description, type, level, localisation, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    values = [infraction_temp.idSheet, infraction_temp.description, infraction_temp.type, infraction_temp.criticalityLevel, infraction_temp.localisation, infraction_temp.date];

    logger.logExceptOnTest("Inserting new infraction.");
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
    let id = parser.URLParse.param_idInfraction()
    var infraction_temp = new infraction(0, parser.URLParse.idUseSheet(), parser.URLParse.description(), parser.URLParse.type(), parser.URLParse.criticality(), parser.URLParse.localisation(), parser.URLParse.date());

    statement = 'UPDATE infraction SET id_sheet = $1, description = $2, type = $3, level = $4, localisation = $5, date = $6 WHERE id = $7';
    values = [infraction_temp.idSheet, infraction_temp.description, infraction_temp.type, infraction_temp.criticalityLevel, infraction_temp.localisation, infraction_temp.date, id];

    logger.logExceptOnTest(`Updating infraction with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No vehicle with ID = ${id} was found.`);
        else
            response.status(status.success).json(`infraction with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idInfraction();

    statement = 'DELETE FROM infraction WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting infraction with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`infraction with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries