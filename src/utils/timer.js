/**
 * 
 */
export class Timer {
    /**
     * 
     * @param {*} delay 
     * @param {*} callback 
     */
    constructor(delay, callback) {
        this._delay = delay;
        this._count = 0;
        this._callback = callback;

    }

    /**
     * 
     * @param {*} delta 
     * @returns 
     */
    update(delta) {
        this._count += delta;
        if(this._count >= this._delay) {
            this._callback();
            return true;
        }
        else {
            return false;
        }
    }
}