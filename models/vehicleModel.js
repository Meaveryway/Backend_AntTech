//vehicleModel.js
// TODO: Define state and fuel possible values if there are

class Vehicle {
    constructor(idVehicle, idCatalogue, regNumber, odometer, state, dateRelease, idUnit ) {
        this._idVehicle = idVehicle; //Matricule interne
        this._idCatalogue = idCatalogue;
        this._regNumber = regNumber; //Matricule externe
        this._odometer = odometer;
        this._state = state;
        this._dateRelease = dateRelease;
        this._idUnit = idUnit;
    }


    get idVehicle() {
        return this._idVehicle;
    }

    set idVehicle(value) {
        this._idVehicle = value;
    }

    get idCatalogue() {
        return this._idCatalogue;
    }

    set idCatalogue(value) {
        this._idCatalogue = value;
    }

    get regNumber() {
        return this._regNumber;
    }

    set regNumber(value) {
        this._regNumber = value;
    }


    get odometer() {
        return this._odometer;
    }

    set odometer(value) {
        this._odometer = value;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get dateRelease() {
        return this._dateRelease;
    }

    set dateRelease(value) {
        this._dateRelease = value;
    }

    get idUnit() {
        return this._idUnit;
    }

    set idUnit(value) {
        this._idUnit = value;
    }
}
module.exports = Vehicle;