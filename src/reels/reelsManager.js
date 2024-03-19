import * as PIXI from "pixi.js";
import { Reel } from "./reel.js";
import { Base } from "../base.js";
import { timerManager } from "../utils/timermanager.js";

/**
 * 
 */
export class ReelManager extends Base {
    constructor(numberOfReels, symbolsPerReel, reelWidth, symbolHeight) {
        super();
        this._numberOfReels = numberOfReels;
        this._symbolsPerReel = symbolsPerReel;
        this._reelWidth = reelWidth;
        this._symbolHeight = symbolHeight;
        this._reels = [];
        this._create();
    }

    /**
     * 
     */
    async startSpin() {
        if (this._spinning) {
            return;
        }
        this._spinning = true;
        this._reels.forEach(reel => {
            reel.startSpin();
        });
        this._promises = [];
        await timerManager.startTimer(2000);
        this._promises.push(this._reels[0].stopSpin());
        await timerManager.startTimer(250);
        this._promises.push(this._reels[1].stopSpin());
        await timerManager.startTimer(250);
        this._promises.push(this._reels[2].stopSpin());
        
        await Promise.all(this._promises);
        
        this._spinning = false;
    }

    /**
     * 
     */
    _create() {
        this._native = new PIXI.Container("reelManager");
        this._native.x = 314;
        this._native.y = 80;
        this._createMask();
        this._createReels();
    }

    /**
     * 
     */
    _createMask() {
        this._mask = PIXI.Sprite.from("mask");
        this._mask.y = 23;
        this._mask.scale.x = 2.3;
        this._mask.scale.y = 2.7;
        this._native.addChild(this._mask);
        this._native.mask = this._mask;
    }

    /**
     * 
     */
    _createReels() {
        for(let i = 0; i < this._numberOfReels; i++ ) {
            const reel = new Reel(this._symbolsPerReel, this._symbolHeight);
            reel.x = i * this._reelWidth;
            this._native.addChild(reel.native);
            this._reels.push(reel);
        }
    }
}