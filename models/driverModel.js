//DriverModel.js

class Driver {

    constructor(idDriver, fullName, birthdate, idUnit) {
        this._idDriver = idDriver;
        this._fullName = fullName;
        this._birthdate = birthdate;
        this._idUnit = idUnit;
    }

    get idDriver() {
        return this._idDriver;
    }

    set idDriver(value) {
        this._idDriver = value;
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(value) {
        this._fullName = value;
    }

    get birthdate() {
        return this._birthdate;
    }

    set birthdate(value) {
        this._birthdate = value;
    }

    get idUnit() {
        return this._idUnit;
    }

    set idUnit(value) {
        this._idUnit = value;
    }
}
module.exports = Driver;