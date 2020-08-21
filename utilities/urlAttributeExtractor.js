//urlAttributeExtractor.js

function URLParse(request){

    URLParse.idVehicle = function(){return request.body.id_vehicle}
    URLParse.idComponent = function(){return request.body.id_component}
    URLParse.idCatalogueComponent = function(){return request.body.id_catalogue}
    URLParse.idCatalogueVehicle = function(){return request.body.id_catalogue}
    URLParse.idDefaultComponent = function(){return request.body.id_default}
    URLParse.idDefaultCatalogueVehicle = function(){return request.body.id_vehicle}
    URLParse.idDefaultCatalogueComponent = function(){return request.body.id_component}
    URLParse.idDriver = function(){return request.body.id_driver}
    URLParse.idHandbook = function(){return request.body.id_handbook}
    URLParse.idManufacturer = function(){return request.body.id_manufacturer}
    URLParse.idOperationalUnit = function(){return request.body.id_unit}
    URLParse.idMaintenanceUnit = function(){return request.body.id_maintenance_unit}
    URLParse.idInfraction = function(){return request.body.id_infraction}
    URLParse.idUseSheet = function(){return request.body.id_sheet}
    URLParse.idUseSpeed = function(){return request.body.id_speed}
    URLParse.idControl = function(){return request.body.id_control}
    URLParse.idMaintenanceSheet = function(){return request.body.id_sheet}
    URLParse.idDriverREX = function(){return request.body.id_driver_rex}
    URLParse.idMechanicREX = function(){return request.body.id_mechanic_rex}
    URLParse.idInstructionDriving = function(){return request.body.id_driving}
    URLParse.idInstructionIndicator = function(){return request.body.id_indicator}
    URLParse.idInstructionInterchange = function(){return request.body.id_interchange}


    //++++++++++++++++++++ General
    URLParse.designation = function(){return request.body.designation}
    URLParse.description = function(){return request.body.description}
    URLParse.date = function(){return request.body.date}
    URLParse.type = function(){return request.body.type}
    URLParse.duration = function(){return request.body.duration}
    URLParse.criticality = function(){return request.body.criticality}
    URLParse.state = function(){return request.body.state}
    URLParse.city = function(){return request.body.city}
    URLParse.region = function(){return request.body.region}
    URLParse.address = function(){return request.body.address}
    URLParse.capacity = function(){return request.body.capacity}
    URLParse.level = function(){return request.body.level}
    URLParse.category = function(){return request.body.category}
    URLParse.filepath = function(){return request.body.filepath}

    //++++++++++++++++++++ CatalogueComponent
    URLParse.afnorLevel =  function(){return request.body.afnor}
    URLParse.frequency = function(){return request.body.frequency}
    URLParse.detectability = function(){return request.body.detectability}

    //++++++++++++++++++++ Component
    URLParse.odometerInstallation = function(){return request.body.odometer_installation}
    URLParse.odometerLastControl = function(){return request.body.odometer_last_control}
    URLParse.dateInstallation = function(){return request.body.date_installation}

    //++++++++++++++++++++ CatalogueVehicle
    URLParse.brand = function(){return request.body.brand}
    URLParse.fuel = function(){return request.body.fuel}

    //++++++++++++++++++++ Vehicle
    URLParse.regNumber = function(){return request.body.reg_number}
    URLParse.odometer = function(){return request.body.odometer}
    URLParse.dateRelease = function(){return request.body.date_release}

    //++++++++++++++++++++ Manufacturer
    URLParse.phone = function(){return request.body.phone}
    URLParse.speciality = function(){return request.body.speciality}

    //++++++++++++++++++++ Driver
    URLParse.fullname = function(){return request.body.fullname}
    URLParse.birthdate = function(){return request.body.birthdate}

    //++++++++++++++++++++ Infraction
    URLParse.localisation = function(){return request.body.localisation}

    //++++++++++++++++++++ Indicator Instruction
    URLParse.threshold = function(){return request.body.threshold}

    //++++++++++++++++++++ Interchange Instruction
    URLParse.original = function(){return request.body.id_original}
    URLParse.substitution = function(){return request.body.id_substitution}

    //++++++++++++++++++++ Maintenance Sheet
    URLParse.dateEntry = function(){return request.body.date_entry}
    URLParse.dateExit = function(){return request.body.date_exit}
    //++++++++++++++++++++ Use & Speed Sheet
    URLParse.dateStart = function(){return request.body.date_start}
    URLParse.dateEnd = function(){return request.body.date_end}
    URLParse.motive = function(){return request.body.motive}
    URLParse.distance = function(){return request.body.distance}

    URLParse.time = function(){return request.body.time}
    URLParse.speed = function(){return request.body.speed}

//URLParse. = function(){return request.body.}
    //===========================Params
    URLParse.param_idCatalogueComponent = function(){return request.params.id_catalogue}
    URLParse.param_idCatalogueVehicle = function(){return request.params.id_catalogue}
    URLParse.param_idComponent = function(){return request.params.id_component}
    URLParse.param_idVehicle = function(){return request.params.id_vehicle}
    URLParse.param_idDefault = function(){return request.params.id_default}
    URLParse.param_idDefaultCatalogueComponent = function(){return request.params.id_component}
    URLParse.param_idDefaultCatalogueVehicle = function(){return request.params.id_vehicle}
    URLParse.param_idDriver = function(){return request.params.id_driver}
    URLParse.param_idHandbook = function(){return request.params.id_handbook}
    URLParse.param_idControl = function(){return request.params.id_control}
    URLParse.param_idManufacturer = function(){return request.params.id_manufacturer}
    URLParse.param_idOperationalUnit = function(){return request.params.id_unit}
    URLParse.param_idMaintenanceUnit = function(){return request.params.id_unit}
    URLParse.param_idInfraction = function(){return request.params.id_infraction}
    URLParse.param_idUseSheet = function(){return request.params.id_sheet}
    URLParse.param_idMaintenanceSheet = function(){return request.params.id_sheet}
    URLParse.param_idDriverREX = function(){return request.params.id_driver_rex}
    URLParse.param_idMechanicREX = function(){return request.params.id_mechanic_rex}
    URLParse.param_idInstructionDriving = function(){return request.params.id_driving}
    URLParse.param_idInstructionIndicator = function(){return request.params.id_indicator}
    URLParse.param_idInstructionInterchange = function(){return request.params.id_interchange}

    //===========================Params for peculiars: Catalogue of components
    URLParse.thresholdUsed = function(){return request.params.threshold_used}
    URLParse.thresholdHandbook = function(){return request.params.threshold_handbook}
    URLParse.thresholdREX = function(){return request.params.threshold_rex}


    //===========================Params for peculiars: Vehicle
    URLParse.param_odometer = function (){return request.params.odometer}
    URLParse.param_state = function (){return request.params.state}

}



module.exports = {
    URLParse : URLParse
};