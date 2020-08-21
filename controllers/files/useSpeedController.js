//useSpeedController.js
// TODO: Post actions field validation


var database = require('../../utilities/databaseAccess');
var UseSpeed = require('../../models/files/useSpeedModel');
var parser = require('../../utilities/urlAttributeExtractor');
let status = require('../../utilities/constants');
let logger = require('../../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM use_speed ORDER BY id';

    logger.logExceptOnTest(`Indexing all usage speeds.`);
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
    let id = parser.URLParse.param_idUseSheet();

    statement = 'SELECT * FROM use_speed WHERE id_use_sheet = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing speeds associated to use sheet with ID = ${id}.`);
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
    var useSpeed_temp = new UseSpeed(0, parser.URLParse.idUseSheet(), parser.URLParse.time(), parser.URLParse.speed());

    statement = 'INSERT INTO use_speed (id_use_sheet, time, speed) VALUES ($1, $2, $3) RETURNING *';
    values = [useSpeed_temp.idSheet, useSpeed_temp.time, useSpeed_temp.speed];

    logger.logExceptOnTest("Inserting new use speed.");
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(results.rows[0]);
    })
}

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idUseSheet();

    statement = 'DELETE FROM use_speed WHERE id_use_sheet = $1';
    values = [id];

    logger.logExceptOnTest("Deleting usage speeds associated with use sheet having ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Usage speeds of use sheet with ID = ${id} were deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries