import {IDifficulty} from "./IDifficulty";
import {Square} from "./Square";
import {Language} from "./Language";
import _ = require("lodash");
import {Settings} from "./Settings";

/*
* Strategy class for medium difficulty
*/
export class Medium implements IDifficulty{

    public calculateNextMove(grid:Square[], computerSymbol:string):number{
        let mySquares = [...grid];
        let myArr: Square[][];
        myArr = [];
        while(mySquares.length) {
            myArr.push(mySquares.splice(0, Settings.getInstance().rowsOfSquares));
        }

        let humanSymbol:string;
        let bestComputerMove:number = -1;
        let bestHumanMove:number = -1;
        let computerSymbolsInARow: number = 0;
        let humanSymbolsInARow: number = 0;
        let positionOfEmpty:number = -1;

        if(computerSymbol == Language.getInstance().xBtnScoreSymbol){
            humanSymbol = Language.getInstance().zeroBtnScoreSymbol;
        }else{
            humanSymbol = Language.getInstance().xBtnScoreSymbol;
        }

        _.times(Settings.getInstance().rowsOfSquares, (i:number) =>{
            _.times(Settings.getInstance().rowsOfSquares, (y:number) =>{
                if (myArr[i][y].getSymbol() === computerSymbol){
                    computerSymbolsInARow++;
                }else if(myArr[i][y].getSymbol() === humanSymbol){
                    humanSymbolsInARow++;
                }else if(myArr[i][y].getSymbol() === ''){
                    positionOfEmpty = y;
                }
            });
            if((computerSymbolsInARow == Settings.getInstance().rowsOfSquares-1) && (positionOfEmpty != -1)){
                bestComputerMove = Settings.getInstance().rowsOfSquares * i + positionOfEmpty;
            }else if(humanSymbolsInARow == Settings.getInstance().rowsOfSquares-1 && (positionOfEmpty != -1)){
                bestHumanMove = Settings.getInstance().rowsOfSquares * i + positionOfEmpty;
            }
            computerSymbolsInARow = 0;
            humanSymbolsInARow = 0;
            positionOfEmpty = -1;
        });

        _.times(Settings.getInstance().rowsOfSquares, (i:number) =>{
            _.times(Settings.getInstance().rowsOfSquares, (y:number) =>{
                if (myArr[y][i].getSymbol() === computerSymbol) {
                    computerSymbolsInARow++;
                }else if(myArr[y][i].getSymbol() === humanSymbol){
                    humanSymbolsInARow++;
                }else if(myArr[y][i].getSymbol() === ''){
                    positionOfEmpty =  y;
                }
            });
            if(computerSymbolsInARow == Settings.getInstance().rowsOfSquares-1 && positionOfEmpty != -1){
                bestComputerMove = Settings.getInstance().rowsOfSquares * positionOfEmpty + i;
            }else if(humanSymbolsInARow == Settings.getInstance().rowsOfSquares-1 && (positionOfEmpty != -1)){
                bestHumanMove = Settings.getInstance().rowsOfSquares * positionOfEmpty + i;
            }
            computerSymbolsInARow = 0;
            humanSymbolsInARow = 0;
            positionOfEmpty = -1;
        });

        _.times(Settings.getInstance().rowsOfSquares, (i:number) =>{
            if(myArr[i][i].getSymbol() === computerSymbol){
                computerSymbolsInARow++;
            }else if(myArr[i][i].getSymbol() === humanSymbol){
                humanSymbolsInARow++;
            }else if(myArr[i][i].getSymbol() === ''){
            positionOfEmpty = i;
        }
        });
        if(computerSymbolsInARow == Settings.getInstance().rowsOfSquares-1 && positionOfEmpty != -1){
            bestComputerMove = Settings.getInstance().rowsOfSquares * positionOfEmpty + positionOfEmpty;
        }else if(humanSymbolsInARow == Settings.getInstance().rowsOfSquares-1 && (positionOfEmpty != -1)){
            bestHumanMove = Settings.getInstance().rowsOfSquares * positionOfEmpty + positionOfEmpty;
        }

        computerSymbolsInARow = 0;
        humanSymbolsInARow = 0;
        positionOfEmpty = -1;
        let row = -1;
        _.times(Settings.getInstance().rowsOfSquares, (i:number) =>{
            if(myArr[i][Settings.getInstance().rowsOfSquares-1-i].getSymbol() === computerSymbol){
                computerSymbolsInARow++;
            }else if(myArr[i][Settings.getInstance().rowsOfSquares-1-i].getSymbol() === humanSymbol){
                humanSymbolsInARow++;
            }else if(myArr[i][Settings.getInstance().rowsOfSquares-1-i].getSymbol() === ''){
                positionOfEmpty = Settings.getInstance().rowsOfSquares-1-i;
                row = i;
            }
        });
        if(computerSymbolsInARow == Settings.getInstance().rowsOfSquares-1 && positionOfEmpty != -1){
            bestComputerMove = Settings.getInstance().rowsOfSquares * row + positionOfEmpty;
        }else if(humanSymbolsInARow == Settings.getInstance().rowsOfSquares-1 && (positionOfEmpty != -1)){
            bestHumanMove = Settings.getInstance().rowsOfSquares * row + positionOfEmpty;
        }

        if(bestComputerMove != -1){
            return bestComputerMove;
        }
        if(bestHumanMove != -1){
            return bestHumanMove;
        }
        return this.getRandomMove(grid);
    }

    /*
    * Generates random move
    */
    private getRandomMove(grid:Square[]):number{
        let randomPosition: number = _.random(0,grid.length-1);
        while (grid[randomPosition].getSymbol() === Language.getInstance().xBtnScoreSymbol ||
        grid[randomPosition].getSymbol() === Language.getInstance().zeroBtnScoreSymbol) {
            randomPosition = _.random(0, grid.length-1);
        }
        return randomPosition;
    }



}