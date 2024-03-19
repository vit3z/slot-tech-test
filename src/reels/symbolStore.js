import { Symbol } from "./symbol.js";

/**
 * 
 */
class SymbolStore {
    constructor() {
        this._symbols = new Map();
    }

    /**
     * 
     * @param {*} symbolIds 
     * @param {*} reels 
     * @param {*} rows 
     */
    createSymbols(symbolIds, reels, rows) {
        const maxSymbols = reels * rows;

        for(let i = 0; i < symbolIds.length; i++) { 
            const {id, name} = symbolIds[i];       
            const symbols = [];
            for(let j = 0; j < maxSymbols; j++) {
                symbols.push(new Symbol(id, name))
            }
            
            this._symbols.set(id, symbols);
        }
    }

    /**
     * 
     * @returns 
     */
    getRandomSymbol() {
        const symbolId = Math.floor(Math.random() * this._symbols.size);
        return this.getSymbol(symbolId);
    }

    /**
     * 
     * @param {*} id 
     * @returns 
     */
    getSymbol(id) {
        if (this._symbols.has(id)) {
            let symbol = this._symbols.get(id).pop();
            return symbol;
        }
    }

    /**
     * 
     * @param {*} symbol 
     */
    returnSymbol(symbol) {
        symbol.reset();
        this._symbols.get(symbol.id).push(symbol);
    }
}

export const symbolStore = new SymbolStore();