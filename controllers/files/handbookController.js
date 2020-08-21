//handbookController.js
// TODO: Post actions field validation


var database = require('../../utilities/databaseAccess');
var Handbook = require('../../models/files/handbookModel');
var parser = require('../../utilities/urlAttributeExtractor');
let status = require('../../utilities/constants');
let logger = require('../../utilities/logger');
exports.index = function(request, response) {

    statement = 'SELECT * FROM handbook ORDER BY id';

    logger.logExceptOnTest(`Indexing handbooks.`);
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
    let id = parser.URLParse.param_idHandbook();

    statement = 'SELECT * FROM handbook WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing handbook with ID = ${id}.`);
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
    var handbook_temp = new Handbook(0, parser.URLParse.filepath(), parser.URLParse.date());

    statement = 'INSERT INTO handbook (filepath, date_release) VALUES ($1, $2) RETURNING *';
    values = [handbook_temp.filePath, handbook_temp.date_release];

    logger.logExceptOnTest("Inserting new handbook.");
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
    let id = parser.URLParse.param_idHandbook()
    var handbook_temp = new Handbook(0, parser.URLParse.filepath(), parser.URLParse.date());

    statement = 'UPDATE handbook SET filepath = $1, date_release = $2 WHERE id = $3';
    values = [handbook_temp.filePath, handbook_temp.date_release, id];

    logger.logExceptOnTest(`Updating handbook with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Handbook with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idHandbook();

    statement = 'DELETE FROM handbook WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting handbook with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Handbook with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries