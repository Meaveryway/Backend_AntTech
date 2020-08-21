//ControlOperationModel.js

class Control {

    constructor(idControl, date, duration, odometer, idSheet, idComponant) {
        this._idControl = idControl;
        this._date = date;
        this._duration = duration;
        this._odometer = odometer;
        this._idSheet = idSheet; //Maintenance Sheet
        this._idComponant = idComponant;
    }

    get idControl() {
        return this._idControl;
    }

    set idControl(value) {
        this._idControl = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get duration() {
        return this._duration;
    }

    set duration(value) {
        this._duration = value;
    }

    get odometer() {
        return this._odometer;
    }

    set odometer(value) {
        this._odometer = value;
    }

    get idSheet() {
        return this._idSheet;
    }

    set idSheet(value) {
        this._idSheet = value;
    }

    get idComponant() {
        return this._idComponant;
    }

    set idComponant(value) {
        this._idComponant = value;
    }
}

module.exports = Control;