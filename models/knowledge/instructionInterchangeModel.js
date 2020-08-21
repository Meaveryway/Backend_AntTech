//instructionInterchangeModel.js

class InstructionInterchange{

    constructor(idInterchange, idOriginal, idSubstitution, date) {
        this._idInterchange = idInterchange;
        this._idOriginal = idOriginal;
        this._idSubstitution = idSubstitution;
        this._date = date;
    }

    get idInterchange() {
        return this._idInterchange;
    }

    set idInterchange(value) {
        this._idInterchange = value;
    }

    get idOriginal() {
        return this._idOriginal;
    }

    set idOriginal(value) {
        this._idOriginal = value;
    }

    get idSubstitution() {
        return this._idSubstitution;
    }

    set idSubstitution(value) {
        this._idSubstitution = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }
}

module.exports = InstructionInterchange;