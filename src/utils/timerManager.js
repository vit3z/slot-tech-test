import { renderer } from "../renderer.js";
import { Timer } from "./timer.js";
import * as PIXI from "pixi.js";

/**
 * 
 */
class TimerManager {
    /**
     * 
     */
    constructor() {
        this._masterTime = 0;
        this._timers = [];
        
    }
    
    /**
     * 
     */
    init() {
        renderer.app.ticker.add(() => {            ;
            this._onUpdate(renderer.app.ticker.elapsedMS);
        });
    }

    /**
     * 
     * @param {*} delay 
     * @returns 
     */
    async startTimer(delay) {
        const promise = new Promise((resolve) => {
            const timer = new Timer(delay, resolve);
            this._timers.push(timer);
        });

        return promise;
    }

    /**
     * 
     * @param {*} delta 
     */
    _onUpdate(delta) {

        const ms = delta / PIXI.settings.TARGET_FPMS;
        this._masterTime += ms;

        for (let i = this._timers.length - 1; i >= 0; i--) {
            const timer = this._timers[i];

            if (timer.update(delta)) {
                this._timers.splice(i, 1);
            }
        }
    }
}

export const timerManager = new TimerManager();