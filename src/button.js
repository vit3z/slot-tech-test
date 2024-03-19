import { Base } from "./base.js";
import * as PIXI from "pixi.js";

export class Button extends Base {
    
    constructor(image, onClick) {
        super();
        this._create(image, onClick);
    }

    _create(image, onClick) {
        this._native = PIXI.Sprite.from(image);
        this._native.eventMode = 'static';
        this._native.cursor = 'pointer';
        this._native.addListener('pointerdown', () =>{
            onClick();
        });
    }

}