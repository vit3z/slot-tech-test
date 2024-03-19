/**
 * 
 */
export class Base {
    /**
     * 
     */
    constructor() {
        
    }    

    /**
     * 
     */
    get x() {
        return this._native.x;
    }
    set x(x) {
        this._native.x = x;
    }
    
    /**
     * 
     */
    get y() {
        return this._native.y;
    }
    set y(y) {
        this._native.y = y;
    }

    /**
     * 
     */
    get native() {
        return this._native;
    }
}