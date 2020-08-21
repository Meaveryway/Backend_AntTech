//manufacturerController.js
// TODO: Post actions field validation


var database = require('../utilities/databaseAccess');
var Manufacturer = require('../models/ManufacturerModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');

exports.index = function(request, response) {
    statement = 'SELECT * FROM manufacturer ORDER BY id';

    logger.logExceptOnTest(`Indexing manufacturers.`);
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
    let id = parser.URLParse.param_idManufacturer();

    statement = 'SELECT * FROM manufacturer WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest(`Viewing manufacturer with ID = ${id}.`);
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
    var Manufacturer_temp = new Manufacturer(0, parser.URLParse.designation(), parser.URLParse.phone(), parser.URLParse.speciality());

    statement = 'INSERT INTO manufacturer (designation, phone, speciality) VALUES ($1, $2, $3) RETURNING *';
    values = [Manufacturer_temp.designation, Manufacturer_temp.phone, Manufacturer_temp.speciality];

    logger.logExceptOnTest("Inserting new manufacturer.");
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
    let id = parser.URLParse.param_idManufacturer()
    var Manufacturer_temp = new Manufacturer(0, parser.URLParse.designation(), parser.URLParse.phone(), parser.URLParse.speciality());

    statement = 'UPDATE manufacturer SET designation = $1, phone = $2, speciality = $3 WHERE id = $4';
    values = [Manufacturer_temp.designation, Manufacturer_temp.phone, Manufacturer_temp.speciality, id];

    logger.logExceptOnTest(`Updating manufacturer with ID = ${id}.`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No manufacturer with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Manufacturer with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idManufacturer();

    statement = 'DELETE FROM manufacturer WHERE id = $1';
    values = [id];

    logger.logExceptOnTest("Deleting manufacturer with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No manufacturer with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Manufacturer with ID = ${id} was deleted.`);
    })
}

//------------------------------------------------------------ Peculiar queries