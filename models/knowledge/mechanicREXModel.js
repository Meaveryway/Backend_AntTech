//MechanicREXModel.js
// TODO:Define possible types.
// TODO:Define possible status.
class MechanicREX {

    constructor(idDriverREX, description, type, status, date, idSheet) {
        this._idDriverREX = idDriverREX;
        this._description = description;
        this._type = type;
        this._status = status;
        this._date = date;
        this._idSheet = idSheet;
    }

    get idDriverREX() {
        return this._idDriverREX;
    }

    set idDriverREX(value) {
        this._idDriverREX = value;
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

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get idSheet() {
        return this._idSheet;
    }

    set idSheet(value) {
        this._idSheet = value;
    }
}

module.exports = MechanicREX;