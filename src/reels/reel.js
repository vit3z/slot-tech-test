import * as PIXI from "pixi.js";
import { symbolStore } from "./symbolStore.js";
import { Base } from "../base.js";
import { Easings, Tween } from "../utils/tween.js";
import { renderer } from "../renderer.js";

/**
 * 
 */
export class Reel extends Base {
    /**
     * 
     * @param {*} numberOfSymbols 
     * @param {*} symbolHeight 
     */
    constructor(numberOfSymbols, symbolHeight) {
        super();
        this._symbolsInView = numberOfSymbols;
        this._symbolHeight = symbolHeight;
        this._symbols = [];
        this._spinning = false;
        this._spinningSpeed = 0;
        this._create();
    }

    /**
     * 
     */
    async startSpin() {
        if(this._spinning) {
            return;
        }
        this._spinning = true;
        this._createNextSymbol();
        
        Tween.fromTo(this, 1000, {_spinningSpeed: 0, ease: Easings.Back.easeIn}, {_spinningSpeed: 10}).startPromise();

    }



    /**
     * 
     */
    async stopSpin() {
        this._stopping = true;        
        return new Promise(resolve => {
            this._resolve = resolve;
        })
    }

    /**
     * 
     */
    async stop() {
        await Tween.fromTo(this._native, 750, {y: 0, ease: Easings.Back.easeOut}, {y: this._symbolHeight}).startPromise();
        this._native.y = 0;
        const symbol = this._symbols.pop();
        symbolStore.returnSymbol(symbol);
        this._repositionSymbols();
        this._resolve();
    }

    /**
     * 
     */
    _repositionSymbols() {
        const paddingTop = this._symbols.length === this._symbolsInView + 2 ? 1 : 2;
        this._symbols.forEach((symbol, index) => symbol.y = (this._symbolHeight*index) - (this._symbolHeight*paddingTop));
    }

    /**
     * 
     */
    _create() {
        this._native = new PIXI.Container("reel");
        const totalHeight = this._symbolHeight * (this._symbolsInView);
        for (let i = 0; i < this._symbolsInView + 2; i++) { // adding symbol before and after to hide creation and removal of symbols
            const symbol = symbolStore.getRandomSymbol();
            symbol.y = totalHeight - (i * this._symbolHeight);
            this._native.addChild(symbol.native);
            this._symbols.unshift(symbol);
        }
        renderer.app.ticker.add(() => {
            this._update(renderer.app.ticker.elapsedMS);
        });
    }

    /**
     * 
     * @param {*} symbolId 
     */
    _createNextSymbol(symbolId=null) {
        const symbol = symbolId === null ? symbolStore.getRandomSymbol() : symbolStore.getSymbol(symbolId);
        symbol.y = this._symbols[0].native.y-this._symbolHeight;
        this._native.addChild(symbol.native);
        this._symbols.unshift(symbol);
    }

    /**
     * 
     * @returns 
     */
    async _update() {
        if(!this._spinning) {
            return;
        }
        this._symbols.forEach(symbol => {
            symbol.native.y += this._spinningSpeed;
        });

        if (this._symbols[0].native.y >= -this._symbolHeight ) {
            this._createNextSymbol();
            const symbol = this._symbols.pop();
            symbolStore.returnSymbol(symbol);
            if (this._stopping) {
                this._stopping = false;
                this._spinning = false;
                this._repositionSymbols();             
                this.stop();
            }
        }
    }
}