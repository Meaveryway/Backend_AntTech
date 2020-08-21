//HandbookModel.js

class Handbook {
    constructor(idHandbook, filePath, date_release) {
        this._idHandbook = idHandbook;
        this._filePath = filePath;
        this._date_release = date_release;
    }

    get idHandbook() {
        return this._idHandbook;
    }

    set idHandbook(value) {
        this._idHandbook = value;
    }

    get filePath() {
        return this._filePath;
    }

    set filePath(value) {
        this._filePath = value;
    }

    get date_release() {
        return this._date_release;
    }

    set date_release(value) {
        this._date_release = value;
    }
}

module.exports = Handbook;