//UseSheetModel.js
// TODO:Define use motives, or maybe it's just an open field?
class UseSheet {

    constructor(idSheet, dateStart, dateEnd, motive, distance, idDriver) {
        this._idSheet = idSheet;
        this._dateStart = dateStart;
        this._dateEnd = dateEnd;
        this._motive = motive;
        this._distance = distance;
        this._idDriver = idDriver
    }


    get idSheet() {
        return this._idSheet;
    }

    set idSheet(value) {
        this._idSheet = value;
    }

    get dateStart() {
        return this._dateStart;
    }

    set dateStart(value) {
        this._dateStart = value;
    }

    get dateEnd() {
        return this._dateEnd;
    }

    set dateEnd(value) {
        this._dateEnd = value;
    }

    get motive() {
        return this._motive;
    }

    set motive(value) {
        this._motive = value;
    }

    get distance() {
        return this._distance;
    }

    set distance(value) {
        this._distance = value;
    }

    get idDriver() {
        return this._idDriver;
    }

    set idDriver(value) {
        this._idDriver = value;
    }
}

module.exports = UseSheet;