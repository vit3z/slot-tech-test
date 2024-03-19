import * as PIXI from "pixi.js";
import { Base } from "../base.js";

/**
 * 
 */
export class Symbol extends Base {
    constructor(id,type) {
        super();
        this._create(id, type);
    }

    /**
     * 
     */
    get id() {
        return this._id;
    }

    /**
     * 
     */
    play() {
        this._native.play();
    }

    /**
     * 
     */
    reset(){
        this._native.parent.removeChild(this._native);       
        this._native.x = 0;
        this._native.y = 0;
    }

    /**
     * 
     * @param {*} id 
     * @param {*} type 
     */
    _create(id, type) {
        this._id = id;
        this._type = type;
        const animations = PIXI.Assets.cache.get(this._type).data.animations;
        this._native = PIXI.AnimatedSprite.fromFrames(animations[`${this._type}Win`]);
    }
}