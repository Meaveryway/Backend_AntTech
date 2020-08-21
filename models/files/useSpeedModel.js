//UseSpeedModel.js
// TODO:Define use motives, or maybe it's just an open field?
class UseSpeed {

    constructor(idSpeed, idSheet, time, speed) {
        this._idSpeed = idSpeed;
        this._idSheet = idSheet;
        this._time = time;
        this._speed = speed;
    }


    get idSpeed() {
        return this._idSpeed;
    }

    set idSpeed(value) {
        this._idSpeed = value;
    }

    get idSheet() {
        return this._idSheet;
    }

    set idSheet(value) {
        this._idSheet = value;
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }
}

module.exports = UseSpeed;