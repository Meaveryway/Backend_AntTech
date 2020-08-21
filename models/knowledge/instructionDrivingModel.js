//InstructionDrivingModel.js
// TODO:Define possible types.
class InstructionDriving{


    constructor(idDriving, description, type, date /*, vehicleType*/) {
        this._idDriving = idDriving;
        this._description = description;
        this._type = type;
        this._date = date;
        //this._vehicleType = vehicleType;
    }

    get idDriving() {
        return this._idDriving;
    }

    set idDriving(value) {
        this._idDriving = value;
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

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }
}

module.exports = InstructionDriving;