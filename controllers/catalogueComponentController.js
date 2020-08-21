//catalogueComponentController.js
// TODO: Post actions field validation
// TODO: treat duplicate erros

var database = require('../utilities/databaseAccess');
var CatalogueComponent = require('../models/catalogueComponentModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');


exports.index = function(request, response) {
    statement = 'SELECT * FROM catalogue_component ORDER BY id';

    logger.logExceptOnTest("Indexing the catalogue of components.");
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
    let id = parser.URLParse.param_idCatalogueComponent();

    statement = 'SELECT * FROM catalogue_component WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest("viewing components' catalogue entry with ID = ", id);
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
    var catalogueEntry_temp = new CatalogueComponent(0, parser.URLParse.designation(), parser.URLParse.idManufacturer(), parser.URLParse.afnorLevel(), parser.URLParse.criticality(), parser.URLParse.frequency(), parser.URLParse.detectability(), parser.URLParse.idHandbook(), 0, 0, true);

    statement = 'INSERT INTO catalogue_component (designation, id_manufacturer, afnor, criticality, frequency, detectability, id_handbook, threshold_used, threshold_handbook, threshold_rex) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    values = [catalogueEntry_temp.designation, catalogueEntry_temp.idManufacturer, catalogueEntry_temp.afnor, catalogueEntry_temp.criticality, catalogueEntry_temp.frequency, catalogueEntry_temp.detectability, catalogueEntry_temp.idHandbook, true, 0, 0];

    logger.logExceptOnTest("inserting new entry in the components' catalogue.");
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
    let id = parser.URLParse.param_idCatalogueComponent();
    var catalogueEntry_temp = new CatalogueComponent(0, parser.URLParse.designation(), parser.URLParse.idManufacturer(), parser.URLParse.afnorLevel(), parser.URLParse.criticality(), parser.URLParse.frequency(), parser.URLParse.detectability(), parser.URLParse.idHandbook(), parser.URLParse.thresholdHandbook(), parser.URLParse.thresholdREX(), parser.URLParse.thresholdUsed());

    statement = 'UPDATE catalogue_component SET designation = $1, id_manufacturer = $2, afnor = $3, criticality = $4, frequency = $5, detectability = $6, id_handbook = $7, threshold_used = $8, threshold_handbook = $9, threshold_rex = $10 WHERE id = $11'
    values = [catalogueEntry_temp.designation, catalogueEntry_temp.idManufacturer, catalogueEntry_temp.afnor, catalogueEntry_temp.criticality, catalogueEntry_temp.frequency, catalogueEntry_temp.detectability, catalogueEntry_temp.idHandbook, catalogueEntry_temp.thresholdUsed, catalogueEntry_temp.thresholdHandbook, catalogueEntry_temp.thresholdREX, id];

    logger.logExceptOnTest("updating components' catalogue entry with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Catalogue of components' entry with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idCatalogueComponent()


    statement = 'DELETE FROM catalogue_component WHERE id = $1';
    values = [id];

    logger.logExceptOnTest(`deleting component with ID = ${id} from catalogue`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Catalogue of component's entry with ID = ${id} was deleted.`);
    })
}


//------------------------------------------------------------ Peculiar queries
exports.updateThresholdUsed = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idCatalogueComponent();
    let thresholdUsed = parser.URLParse.thresholdUsed();

    statement = 'UPDATE catalogue_component SET threshold_used = $1 WHERE id = $2';
    values = [thresholdUsed, id];

    logger.logExceptOnTest("Updating the used threshold to", thresholdUsed, " (true = handbook, false = REX) for catalogue component with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Used threshold of catalogue component with ID = ${id} was updated to ${thresholdUsed}.`);
    })
};

exports.updateThresholdHandbook = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idCatalogueComponent();
    let threshold = parser.URLParse.thresholdHandbook();

    statement = 'UPDATE catalogue_component SET threshold_handbook = $1 WHERE id = $2';
    values = [threshold, id];

    logger.logExceptOnTest("Updating the handbook threshold to", threshold, " km for catalogue component with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Handbook threshold of catalogue component with ID = ${id} was updated to ${threshold} km.`);
    })
};

exports.updateThresholdREX = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idCatalogueComponent();
    let threshold = parser.URLParse.thresholdREX();

    statement = 'UPDATE catalogue_component SET threshold_rex = $1 WHERE id = $2';
    values = [threshold, id];

    logger.logExceptOnTest("Updating the REX threshold to", threshold, " km for catalogue component with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`REX threshold of catalogue component with ID = ${id} was updated to ${threshold} km.`);
    })
};