import {Square} from "./Square";

/*
* Interface to be implemented by every possible difficulty
*/
export interface IDifficulty{

    calculateNextMove(grid:Square[],computerSymbol:string):number;

}