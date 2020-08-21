//catalogueVehicleController.js
// TODO: Post actions field validation
// TODO: treat duplicate erros

var database = require('../utilities/databaseAccess');
var CatalogueVehicle = require('../models/catalogueVehicleModel');
var parser = require('../utilities/urlAttributeExtractor');
let status = require('../utilities/constants');
let logger = require('../utilities/logger');


exports.index = function(request, response) {
    statement = 'SELECT * FROM catalogue_vehicle ORDER BY id';

    logger.logExceptOnTest("Indexing the catalogue of vehicles.");
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
    let id = parser.URLParse.param_idCatalogueVehicle();

    statement = 'SELECT * FROM catalogue_vehicle WHERE id = $1 ORDER BY id';
    values = [id];

    logger.logExceptOnTest("viewing vehicles' catalogue entry with ID = ", id);
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
    var catalogueEntry_temp = new CatalogueVehicle(0, parser.URLParse.designation(), parser.URLParse.idManufacturer(), parser.URLParse.fuel(), parser.URLParse.idHandbook(), parser.URLParse.category());

    statement = 'INSERT INTO catalogue_vehicle (designation, id_manufacturer, fuel, id_handbook, category) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    values = [catalogueEntry_temp.designation, catalogueEntry_temp.idManufacturer, catalogueEntry_temp.fuel, catalogueEntry_temp.idHandbook, catalogueEntry_temp.category];

    logger.logExceptOnTest("inserting new entry in the vehicles' catalogue.");
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
    let id = parser.URLParse.param_idCatalogueVehicle();
    var catalogueEntry_temp = new CatalogueVehicle(0, parser.URLParse.designation(), parser.URLParse.idManufacturer(), parser.URLParse.fuel(), parser.URLParse.idHandbook(), parser.URLParse.category());

    statement = 'UPDATE catalogue_vehicle SET designation = $1, id_manufacturer = $2, fuel = $3, id_handbook = $4, category = $5 WHERE id = $6'
    values = [catalogueEntry_temp.designation, catalogueEntry_temp.idManufacturer, catalogueEntry_temp.fuel, catalogueEntry_temp.idHandbook, catalogueEntry_temp.category, id];

    logger.logExceptOnTest("updating vehicles' catalogue entry with ID = ", id);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).json(`Catalogue of vehicles' entry with ID = ${id} was modified.`);
    })
};

exports.delete = function(request, response) {
    parser.URLParse(request);
    let id = parser.URLParse.param_idCatalogueVehicle()


    statement = 'DELETE FROM catalogue_vehicle WHERE id = $1';
    values = [id];

    logger.logExceptOnTest(`deleting vehicle with ID = ${id} from catalogue`);
    database.pgConnetion.query(statement, values, (error, results) => {
        if (error) {
            logger.logExceptOnTest("----------------\n" + error + "\n----------------");
            response.status(status.error).send('Can\'t execute the query:\n' + error);
        } else if (results.rowCount < 1)
            response.status(status.success).send(`No element with ID = ${id} was found.`);
        else
            response.status(status.success).send(`Catalogue of vehicles's entry with ID = ${id} was deleted.`);
    })
}


//------------------------------------------------------------ Peculiar queries