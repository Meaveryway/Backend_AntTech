//catalogueComponentModel.js
// TODO:Define AFNOR levels;
// TODO:Define criticality levels;
// TODO:Define frequency values;
// TODO:Define detectability levels;

class CatalogueComponent {
    constructor(idCatalogueComponent, designation, idManufacturer, afnor, criticality, frequency, detectability, idHandbook, thresholdHandbook, thresholdREX, thresholdUsed) {
        this._idCatalogueComponent = idCatalogueComponent;
        this._designation = designation;
        this._idManufacturer = idManufacturer;
        this._afnor = afnor;
        this._criticality = criticality;
        this._frequency = frequency;
        this._detectability = detectability;
        this._idHandbook = idHandbook;

        this._thresholdUsed = thresholdUsed; //The boolean indicating if it's the handbook's (TRUE) or REX (FALSE) threshold that is currently used
        this._thresholdHandbook = thresholdHandbook;
        this._thresholdREX = thresholdREX;
    }

    get idCatalogueComponent() {
        return this._idCatalogueComponent;
    }

    set idCatalogueComponent(value) {
        this._idCatalogueComponent = value;
    }

    get designation() {
        return this._designation;
    }

    set designation(value) {
        this._designation = value;
    }

    get idManufacturer() {
        return this._idManufacturer;
    }

    set idManufacturer(value) {
        this._idManufacturer = value;
    }

    get afnor() {
        return this._afnor;
    }

    set afnor(value) {
        this._afnor = value;
    }

    get criticality() {
        return this._criticality;
    }

    set criticality(value) {
        this._criticality = value;
    }

    get frequency() {
        return this._frequency;
    }

    set frequency(value) {
        this._frequency = value;
    }

    get detectability() {
        return this._detectability;
    }

    set detectability(value) {
        this._detectability = value;
    }

    get idHandbook() {
        return this._idHandbook;
    }

    set idHandbook(value) {
        this._idHandbook = value;
    }


    get thresholdHandbook() {
        return this._thresholdHandbook;
    }

    set thresholdHandbook(value) {
        this._thresholdHandbook = value;
    }

    get thresholdREX() {
        return this._thresholdREX;
    }

    set thresholdREX(value) {
        this._thresholdREX = value;
    }

    get thresholdUsed() {
        return this._thresholdUsed;
    }

    set thresholdUsed(value) {
        this._thresholdUsed = value;
    }
}

module.exports = CatalogueComponent;