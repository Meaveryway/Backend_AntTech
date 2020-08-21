//OperationalUnitModel.js

class OperationalUnit {

    constructor(idOperationalUnit, designation, city, region, address, capacity, idMaintenanceUnit) {
        this._idOperationalUnit = idOperationalUnit;
        this._designation = designation;
        this._city = city;
        this._region = region;
        this._address = address;
        this._capacity = capacity;
        this._idMaintenanceUnit = idMaintenanceUnit;
    }

    get idOperationalUnit() {
        return this._idOperationalUnit;
    }

    set idOperationalUnit(value) {
        this._idOperationalUnit = value;
    }


    get designation() {
        return this._designation;
    }

    set designation(value) {
        this._designation = value;
    }

    get city() {
        return this._city;
    }

    set city(value) {
        this._city = value;
    }

    get region() {
        return this._region;
    }

    set region(value) {
        this._region = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get capacity() {
        return this._capacity;
    }

    set capacity(value) {
        this._capacity = value;
    }

    get idMaintenanceUnit() {
        return this._idMaintenanceUnit;
    }

    set idMaintenanceUnit(value) {
        this._idMaintenanceUnit = value;
    }
}

module.exports = OperationalUnit;