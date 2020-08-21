//InstructionIndicatorModel.js

class InstructionIndicator{

    constructor(idIndicator, idComponent, threshold, date) {
        this._idIndicator = idIndicator;
        this._idComponent = idComponent;
        this._threshold = threshold;
        this._date = date;
    }

    get idIndicator() {
        return this._idIndicator;
    }

    set idIndicator(value) {
        this._idIndicator = value;
    }

    get idComponent() {
        return this._idComponent;
    }

    set idComponent(value) {
        this._idComponent = value;
    }

    get threshold() {
        return this._threshold;
    }

    set threshold(value) {
        this._threshold = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }
}

module.exports = InstructionIndicator;