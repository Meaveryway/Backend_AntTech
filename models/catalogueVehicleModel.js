//catalogueVehicleModel.js
// TODO:Define AFNOR levels;
// TODO:Define criticality levels;
// TODO:Define frequency values;
// TODO:Define detectability levels;

class CatalogueVehicle {

    constructor(idCatalogueVehicle, designation, idManufacturer, fuel, idHandbook, category) {
        this._idCatalogueVehicle = idCatalogueVehicle;
        this._designation = designation;
        this._idManufacturer = idManufacturer;
        this._fuel = fuel;
        this._idHandbook = idHandbook;
        this._category = category;
    }

    get idCatalogueVehicle() {
        return this._idCatalogueVehicle;
    }

    set idCatalogueVehicle(value) {
        this._idCatalogueVehicle = value;
    }

    get designation() {
        return this._designation;
    }

    set designation(value) {
        this._designation = value;
    }

    get idManufacturer() {
        return this._idManufacturer;
    }

    set idManufacturer(value) {
        this._idManufacturer = value;
    }

    get fuel() {
        return this._fuel;
    }

    set fuel(value) {
        this._fuel = value;
    }

    get idHandbook() {
        return this._idHandbook;
    }

    set idHandbook(value) {
        this._idHandbook = value;
    }


    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }
}

module.exports = CatalogueVehicle;