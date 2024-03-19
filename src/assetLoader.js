import * as PIXI from "pixi.js";

/**
 * 
 */
class AssetLoader {
    /**
     * 
     */
    constructor() {
        this._queue =[];
    }

    /**
     * 
     * @param {*} asset 
     */
    addToQueue(asset) {
        this._queue.push(asset);
    }

    /**
     * 
     */
    async loadQueue() {
        await PIXI.Assets.load(this._queue);
        this._queue.length = 0;
    }
}

export const assetLoader = new AssetLoader();