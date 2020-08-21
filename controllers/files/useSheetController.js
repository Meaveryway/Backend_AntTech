//useSheetController.js
// TODO: Post actions field validation


var database = require('../../utilities/databaseAccess');
var UseSheet = require('../../models/files/useSheetModel');
var parser = require('../../utilities/urlAttributeExtractor');
let status = require('../../utilities/constants');
let logger = require('../../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM use_sheet ORDER BY id';

    logger.logExceptOnTest(`Indexing use sheets.`);
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

    statement = 'SELECT * FROM use_sheet WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing use sheet with ID = ${id}.`);
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
    var useSheet_temp = new UseSheet(0, parser.URLParse.dateStart(), parser.URLParse.dateEnd(), parser.URLParse.motive(), parser.URLParse.distance(), parser.URLParse.idDriver());

    statement = 'INSERT INTO use_sheet (date_start, date_end, motive, distance, id_driver) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    values = [useSheet_temp.dateStart, useSheet_temp.dateEnd, useSheet_temp.motive, useSheet_temp.distance, useSheet_temp.idDriver];

    logger.logExceptOnTest("Inserting new use sheet.");
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
    let id = parser.URLParse.param_idUseSheet()
    var useSheet_temp = new UseSheet(0, parser.URLParse.dateStart(), parser.URLParse.dateEnd(), parser.URLParse.motive(), parser.URLParse.distance(), parser.URLParse.idDriver());

    statement = 'UPDATE use_sheet SET date_start = $1, date_end = $2, motive = $3, distance = $4, id_driver = $5 WHERE id = $6';
    values = [useSheet_temp.dateStart, useSheet_temp.dateEnd, useSheet_temp.motive, useSheet_temp.distance, useSheet_temp.idDriver, id];

    logger.logExceptOnTest(`Updating use sheet with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Use sheet with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idUseSheet();

    statement = 'DELETE FROM use_sheet WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting use sheet with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Use sheet with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries