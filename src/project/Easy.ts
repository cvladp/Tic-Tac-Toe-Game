import {IDifficulty} from "./IDifficulty";
import {Square} from "./Square";
import {Language} from "./Language";
import _ = require("lodash");

/*
* Strategy class for easy difficulty
*/
export class Easy implements IDifficulty{

    public calculateNextMove(grid:Square[],computerSymbol:string):number{
        let randomPosition: number = _.random(0,grid.length-1);
        while (grid[randomPosition].getSymbol() === Language.getInstance().xBtnScoreSymbol ||
        grid[randomPosition].getSymbol() === Language.getInstance().zeroBtnScoreSymbol) {
            randomPosition = _.random(0, grid.length-1);
        }
        return randomPosition;
    }

}