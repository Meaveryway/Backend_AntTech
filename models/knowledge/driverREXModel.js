//DriverREXModel.js
// TODO:Define criticality levels.
class DriverREX {

    constructor(idDriverREX, idSheet, description, date, criticalityLevel, status) {
        this._idDriverREX = idDriverREX;
        this._idSheet = idSheet;
        this._description = description;
        this._date = date;
        this._criticalityLevel = criticalityLevel;
        this._status = status;
    }

    get idDriverREX() {
        return this._idDriverREX;
    }

    set idDriverREX(value) {
        this._idDriverREX = value;
    }

    get idSheet() {
        return this._idSheet;
    }

    set idSheet(value) {
        this._idSheet = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get criticalityLevel() {
        return this._criticalityLevel;
    }

    set criticalityLevel(value) {
        this._criticalityLevel = value;
    }


    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
}

module.exports = DriverREX;