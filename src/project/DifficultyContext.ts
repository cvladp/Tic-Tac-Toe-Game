import {IDifficulty} from "./IDifficulty";
import {Square} from "./Square";

export class DifficultyContext {
    private _difficulty: IDifficulty;

    constructor(difficulty:IDifficulty) {
        this._difficulty = difficulty;
    }

    public setStrategy(myDifficulty:IDifficulty){
        this._difficulty = myDifficulty;
    }

    public executeStrategy(grid: Square[], computerSymbol: string):number{
        return this._difficulty.calculateNextMove(grid, computerSymbol);
    }
}