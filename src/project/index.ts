import {Game} from "./Game";
import * as PIXI from 'pixi.js';
/*
 * Game entry point class
 */
new class Main {
    private game: Game;

    constructor() {
        window.PIXI = PIXI;
        this.game = new Game();
        this.game.run();
    };
};