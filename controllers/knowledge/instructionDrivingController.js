//instructionDrivingController.js
// TODO: Post actions field validation


var database = require('../../utilities/databaseAccess');
var InstructionDriving = require('../../models/knowledge/instructionDrivingModel');
var parser = require('../../utilities/urlAttributeExtractor');
let status = require('../../utilities/constants');
let logger = require('../../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM instruction_driving ORDER BY id';

    logger.logExceptOnTest(`Indexing instructions of driving.`);
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
    let id = parser.URLParse.param_idInstructionDriving();

    statement = 'SELECT * FROM instruction_driving WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing driving instructions with ID = ${id}.`);
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
    var instructionDriving_temp = new InstructionDriving(0, parser.URLParse.description(), parser.URLParse.type(), parser.URLParse.date());

    statement = 'INSERT INTO instruction_driving (description, type, date) VALUES ($1, $2, $3) RETURNING *';
    values = [instructionDriving_temp.description, instructionDriving_temp.type, instructionDriving_temp.date];

    logger.logExceptOnTest("Inserting new driving instruction.");
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
    let id = parser.URLParse.param_idInstructionDriving();
    var instructionDriving_temp = new InstructionDriving(0, parser.URLParse.description(), parser.URLParse.type(), parser.URLParse.date());

    statement = 'UPDATE instruction_driving SET description = $1, type = $2, date = $3 WHERE id = $4';
    values = [instructionDriving_temp.description, instructionDriving_temp.type, instructionDriving_temp.date, id];

    logger.logExceptOnTest(`Updating driving instruction with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Driving instruction with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idInstructionDriving();

    statement = 'DELETE FROM instruction_driving WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting driving instruction with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Driving instruction with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries