//defaultComponentModel.js

class DefaultComponent {

    constructor(idDefault, idCatalogueVehicle, idCatalogueComponent) {
        this._idDefault = idDefault;
        this._idCatalogueVehicle = idCatalogueVehicle;
        this._idCatalogueComponent = idCatalogueComponent;
    }

    get idDefault() {
        return this._idDefault;
    }

    set idDefault(value) {
        this._idDefault = value;
    }

    get idCatalogueVehicle() {
        return this._idCatalogueVehicle;
    }

    set idCatalogueVehicle(value) {
        this._idCatalogueVehicle = value;
    }

    get idCatalogueComponent() {
        return this._idCatalogueComponent;
    }

    set idCatalogueComponent(value) {
        this._idCatalogueComponent = value;
    }
}

module.exports = DefaultComponent;