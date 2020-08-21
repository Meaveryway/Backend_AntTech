//MaintenanceSheetModel.js

class MaintenanceSheet {

    constructor(idMaintenanceSheet, idUnit, idVehicle, dateEntry, dateExit) {
        this._idMaintenanceSheet = idMaintenanceSheet;
        this._idUnit = idUnit;
        this._idVehicle = idVehicle;
        this._dateEntry = dateEntry;
        this._dateExit = dateExit;
    }


    get idMaintenanceSheet() {
        return this._idMaintenanceSheet;
    }

    set idMaintenanceSheet(value) {
        this._idMaintenanceSheet = value;
    }

    get idUnit() {
        return this._idUnit;
    }

    set idUnit(value) {
        this._idUnit = value;
    }

    get idVehicle() {
        return this._idVehicle;
    }

    set idVehicle(value) {
        this._idVehicle = value;
    }

    get dateEntry() {
        return this._dateEntry;
    }

    set dateEntry(value) {
        this._dateEntry = value;
    }

    get dateExit() {
        return this._dateExit;
    }

    set dateExit(value) {
        this._dateExit = value;
    }
}

module.exports = MaintenanceSheet;