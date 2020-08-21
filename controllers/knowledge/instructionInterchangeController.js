//instructionInterchangeController.js
// TODO: Post actions field validation


var database = require('../../utilities/databaseAccess');
var InstructionInterchange = require('../../models/knowledge/instructionInterchangeModel');
var parser = require('../../utilities/urlAttributeExtractor');
let status = require('../../utilities/constants');
let logger = require('../../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM instruction_interchange ORDER BY id';

    logger.logExceptOnTest(`Indexing instructions of interchange.`);
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
    let id = parser.URLParse.param_idInstructionInterchange();

    statement = 'SELECT * FROM instruction_interchange WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing interchange instructions with ID = ${id}.`);
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
    var instructionInterchange_temp = new InstructionInterchange(0, parser.URLParse.original(), parser.URLParse.substitution(), parser.URLParse.date());

    statement = 'INSERT INTO instruction_interchange (id_original, id_substitution, date) VALUES ($1, $2, $3) RETURNING *';
    values = [instructionInterchange_temp.idOriginal, instructionInterchange_temp.idSubstitution, instructionInterchange_temp.date];

    logger.logExceptOnTest("Inserting new interchange instruction.");
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
    let id = parser.URLParse.param_idInstructionInterchange();
    var instructionInterchange_temp = new InstructionInterchange(0, parser.URLParse.original(), parser.URLParse.substitution(), parser.URLParse.date());

    statement = 'UPDATE instruction_interchange SET id_original = $1, id_substitution = $2, date = $3 WHERE id = $4';
    values = [instructionInterchange_temp.idOriginal, instructionInterchange_temp.idSubstitution, instructionInterchange_temp.date, id];

    logger.logExceptOnTest(`Updating interchange instruction with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`interchange instruction with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idInstructionInterchange();

    statement = 'DELETE FROM instruction_interchange WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting interchange instruction with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`interchange instruction with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries