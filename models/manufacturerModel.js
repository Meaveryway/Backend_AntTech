//ManufacturerModel.js
class Manufacturer {

    constructor(idManufacturer, designation, phone, speciality) {
        this._idManufacturer = idManufacturer;
        this._designation = designation;
        this._phone = phone;
        this._speciality = speciality;
    }

    get idManufacturer() {
        return this._idManufacturer;
    }

    set idManufacturer(value) {
        this._idManufacturer = value;
    }

    get designation() {
        return this._designation;
    }

    set designation(value) {
        this._designation = value;
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    get speciality() {
        return this._speciality;
    }

    set speciality(value) {
        this._speciality = value;
    }
}
module.exports = Manufacturer;