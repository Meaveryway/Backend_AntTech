//instructionindicatorController.js
// TODO: Post actions field validation


var database = require('../../utilities/databaseAccess');
var InstructionIndicator = require('../../models/knowledge/instructionIndicatorModel');
var parser = require('../../utilities/urlAttributeExtractor');
let status = require('../../utilities/constants');
let logger = require('../../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM instruction_indicator ORDER BY id';

    logger.logExceptOnTest(`Indexing instructions of indicator.`);
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
    let id = parser.URLParse.param_idInstructionIndicator();

    statement = 'SELECT * FROM instruction_indicator WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing indicator instructions with ID = ${id}.`);
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
    var instructionIndicator_temp = new InstructionIndicator(0, parser.URLParse.idCatalogueComponent(), parser.URLParse.threshold(), parser.URLParse.date());

    statement = 'INSERT INTO instruction_indicator (id_component, threshold, date) VALUES ($1, $2, $3) RETURNING *';
    values = [instructionIndicator_temp.idComponent, instructionIndicator_temp.threshold, instructionIndicator_temp.date];

    logger.logExceptOnTest("Inserting new indicator instruction.");
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
    let id = parser.URLParse.param_idInstructionIndicator();
    var instructionIndicator_temp = new InstructionIndicator(0, parser.URLParse.idCatalogueComponent(), parser.URLParse.threshold(), parser.URLParse.date());

    statement = 'UPDATE instruction_indicator SET id_component = $1, threshold = $2, date = $3 WHERE id = $4';
    values = [instructionIndicator_temp.idComponent, instructionIndicator_temp.threshold, instructionIndicator_temp.date, id];

    logger.logExceptOnTest(`Updating indicator instruction with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`indicator instruction with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idInstructionIndicator();

    statement = 'DELETE FROM instruction_indicator WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting indicator instruction with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`indicator instruction with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries