//InfractionModel.js
// TODO:Define type options
// TODO:Define criticality levels;

class Infraction {

    constructor(idInfraction, idSheet, description, type, criticalityLevel, localisation, date) {
        this._idInfraction = idInfraction;
        this._idSheet = idSheet;
        this._description = description;
        this._type = type;
        this._criticalityLevel = criticalityLevel;
        this._localisation = localisation;
        this._date = date;
    }

    get idInfraction() {
        return this._idInfraction;
    }

    set idInfraction(value) {
        this._idInfraction = value;
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

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get criticalityLevel() {
        return this._criticalityLevel;
    }

    set criticalityLevel(value) {
        this._criticalityLevel = value;
    }

    get localisation() {
        return this._localisation;
    }

    set localisation(value) {
        this._localisation = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }
}

module.exports = Infraction;