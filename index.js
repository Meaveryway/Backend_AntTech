// TODO: execute PosftgreSQL commands from code to make updates easier for the team.

// TODO: work with serve-static to allow sending files (or maybe use download package instead).
// TODO: include PM2 to handle crashes and auto-restart (in prod, nodemon is still more useful for now, can use both and run depending on use case though).
// TODO: ERRATTA: PM2 Watch mode replaces nodemon
// TODO: Clusterize shit if you ever intend to stress test
// TODO: file uploading with formidable or multer middlewares.
// TODO: routes for file upload (mainly handbooks & REX's) + parsers
// TODO: eventually move database login info to the .env file (dotent).
// TODO: Authenticate with Passport.
// TODO: Restructure project by by self-contained components instead of technical role.
// TODO: Write unit tests with Mocha & Chai + SuperTest.
// TODO: validate fields with Joi (fail fast) or helpers.
// TODO: User logic.
// TODO: User authentication and login with Passport.
// TODO: Tokenism.
// TODO: Export API with pkg.
// TODO: Prepare DB access for production (KNEX)
// TODO: implement correct status code (const status helper enum).
// TODO: make setup script (client queries for tables creation).
var express = require("express");
var moment = require("moment");
var app = express();
let status = require('./utilities/constants');
let logger = require('./utilities/logger');
global.PORT = process.env.port || 3030;

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//--------------------------

//Import routes
catalogueVehicleRouter = require("./routers/catalogueVehicleRouter");
app.use('/catalogue/vehicle', catalogueVehicleRouter);

vehicleRouter = require("./routers/vehicleRouter");
app.use('/vehicle', vehicleRouter);

catalogueComponentRouter = require("./routers/catalogueComponentRouter");
app.use('/catalogue/component', catalogueComponentRouter);

componentRouter = require("./routers/componentRouter");
app.use('/component', componentRouter);

driverRouter = require("./routers/driverRouter");
app.use('/driver', driverRouter);

manufacturerRouter = require("./routers/manufacturerRouter");
app.use('/manufacturer', manufacturerRouter);

infractionRouter = require("./routers/infractionRouter");
app.use('/infraction', infractionRouter);

maintenanceUnitRouter = require("./routers/maintenanceUnitRouter");
app.use('/unit/maintenance', maintenanceUnitRouter);

operationalUnitRouter = require("./routers/operationalUnitRouter");
app.use('/unit/operational', operationalUnitRouter);

controlRouter = require("./routers/controlRouter");
app.use('/control', controlRouter);

driverREXRouter = require("./routers/knowledge/driverREXRouter");
app.use('/rex/driver', driverREXRouter);

mechanicREXRouter = require("./routers/knowledge/mechanicREXRouter");
app.use('/rex/mechanic', mechanicREXRouter);

instructionDrivingRouter = require("./routers/knowledge/instructionDrivingRouter");
app.use('/instruction/driving', instructionDrivingRouter);

instructionIndicatorRouter = require("./routers/knowledge/instructionIndicatorRouter");
app.use('/instruction/indicator', instructionIndicatorRouter);

instructionInterchangeRouter = require("./routers/knowledge/instructionInterchangeRouter");
app.use('/instruction/interchange', instructionInterchangeRouter);

handbookRouter = require("./routers/files/handbookRouter");
app.use('/handbook', handbookRouter);

maintenanceSheetRouterRouter = require("./routers/files/maintenanceSheetRouter");
app.use('/sheet/maintenance', maintenanceSheetRouterRouter);

useSheetRouter = require("./routers/files/useSheetRouter");
app.use('/sheet/use', useSheetRouter);

useSpeedRouter = require("./routers/files/useSpeedRouter");
app.use('/sheet/speed', useSpeedRouter);

DefaultComponentRouter = require("./routers/defaultComponentRouter");
app.use('/default', DefaultComponentRouter);

// Default URL
app.get("/", function(request, response) {
    response.status(status.success).send("Backend server of the techant app is reachable.");
})

// Inexistant URLs
app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(status.notfound).send("Wrong URL. \nThe Techant API doesn't deal with such route.");
});

//Launching server app on port
var server = app.listen(PORT, function() {
    logger.logExceptOnTest(`Hello, Underworld`)
    logger.logExceptOnTest(`app running on port ${PORT} ==>`, server.address().port);
});



//driversDB = require('./queries');
//app.get('/drivers', driversDB.getDrivers);
// TODO:Don't forget to start the PostgreSQL server: brew services start postgresql (with Homebrew on MacOS).
module.exports = server;