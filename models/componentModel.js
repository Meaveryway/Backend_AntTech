//ComponentModel.js

class Component {

    constructor(idComponent, idCatalogue, idVehicle, odometerInstall, odometerLastControl, dateInstall) {
        this._idComponent = idComponent;
        this._idCatalogue = idCatalogue;
        this._idVehicle = idVehicle;
        this._dateInstall = dateInstall;
        this._odometerInstall = odometerInstall;
        this._odometerLastControl = odometerLastControl;
    }


    get idComponent() {
        return this._idComponent;
    }

    set idComponent(value) {
        this._idComponent = value;
    }

    get idCatalogue() {
        return this._idCatalogue;
    }

    set idCatalogue(value) {
        this._idCatalogue = value;
    }

    get idVehicle() {
        return this._idVehicle;
    }

    set idVehicle(value) {
        this._idVehicle = value;
    }

    get dateInstall() {
        return this._dateInstall;
    }

    set dateInstall(value) {
        this._dateInstall = value;
    }

    get odometerInstall() {
        return this._odometerInstall;
    }

    set odometerInstall(value) {
        this._odometerInstall = value;
    }

    get odometerLastControl() {
        return this._odometerLastControl;
    }

    set odometerLastControl(value) {
        this._odometerLastControl = value;
    }
}

module.exports = Component;