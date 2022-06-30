import {IDifficulty} from "./IDifficulty";
import {Square} from "./Square";
import {Settings} from "./Settings";
import _ = require("lodash");
import {Language} from "./Language";

/*
* Strategy class for impossible difficulty
*/
export class ImpossibleDifficulty implements IDifficulty{
    private move:number[];
    private copyGrid:string[][];
    private ai = Language.getInstance().zeroBtnScoreSymbol;
    private human = Language.getInstance().xBtnScoreSymbol;

    public calculateNextMove(grid: Square[],computerSymbol:string ): number {
        this.populateLocalMatrix(grid);
        let bestVal:number = -Infinity;
        this.move = [];
        this.move[0] = -1;
        this.move[1] = -1;
        if(computerSymbol == Language.getInstance().xBtnScoreSymbol){
            this.human = Language.getInstance().zeroBtnScoreSymbol;
            this.ai = computerSymbol;
        } else {
            this.human = Language.getInstance().xBtnScoreSymbol;
            this.ai = computerSymbol;
        }
        _.times(Settings.getInstance().rowsOfSquares, (i:number)=>{
            _.times(Settings.getInstance().rowsOfSquares,(y:number)=>{
               if(this.copyGrid[i][y] ==''){
                   this.copyGrid[i][y] = computerSymbol;
                   let moveVal = this.minmax(0,computerSymbol,false, -Infinity, +Infinity);
                   this.copyGrid[i][y] = '';
                   if(moveVal > bestVal){
                       this.move[0] = i;
                       this.move[1] = y;
                       bestVal = moveVal;
                   }
               }
            });
        });
        return Settings.getInstance().rowsOfSquares * this.move[0] + this.move[1];
    }

    /*
    * Implementation of minmax algorithm
    */
    private minmax(depth:number, currentPlayer:string, isMax:boolean, alpha: number, beta: number):number{
        if(currentPlayer == this.human && this.checkWinningCondition(currentPlayer)){
            return -1 * Settings.getInstance().rowsOfSquares * Settings.getInstance().rowsOfSquares;
        }
        if(currentPlayer == this.ai && this.checkWinningCondition(currentPlayer)){
            return 1 * Settings.getInstance().rowsOfSquares * Settings.getInstance().rowsOfSquares - depth;
        }
        if(this.checkIfGridIsFull(this.copyGrid)){
            return 0;
        }
        if(isMax){
            let best = -Infinity;
            _.times(Settings.getInstance().rowsOfSquares, (i:number)=>{
                _.times(Settings.getInstance().rowsOfSquares, (y:number)=>{
                    if(this.copyGrid[i][y] ==''){
                        this.copyGrid[i][y] = this.ai;
                        let score = this.minmax(depth+1,this.ai ,false, alpha, beta);
                        this.copyGrid[i][y]='';
                        best = Math.max(score,best);
                        alpha = Math.max(alpha,best);
                        if(beta <= alpha){
                            return false;
                        }
                    }
                });
            });
            return best;
        }else{
            let best = Infinity;
            _.times(Settings.getInstance().rowsOfSquares, (i:number)=>{
                _.times(Settings.getInstance().rowsOfSquares,(y:number)=>{
                    if(this.copyGrid[i][y]==''){
                        this.copyGrid[i][y] = this.human;
                        let score = this.minmax(depth+1, this.human,true, alpha, beta);
                        this.copyGrid[i][y] = '';
                        best = Math.min(score,best);
                        beta = Math.min(beta,best);
                        if(beta <= alpha){
                            return false;
                        }
                    }
                });
            });
            return best;
        }
    }

    /*
    * Converts regular array to a 2d array
    */
    private populateLocalMatrix(grid: Square[]):void{

        this.copyGrid = [];
        _.times(Settings.getInstance().rowsOfSquares, (i:number)=>{
            this.copyGrid[i] = [];
        });

        _.times(Settings.getInstance().rowsOfSquares, (i:number)=>{
            _.times(Settings.getInstance().rowsOfSquares, (y:number)=>{
                this.copyGrid[i][y] = grid[i*Settings.getInstance().rowsOfSquares+y].getSymbol();
            }) ;
        });
    }

    /*
    * Checks if every square is occupied with a symbol
    */
    private checkIfGridIsFull(charArr:string[][]):boolean{
        let gridIsFull:boolean = true;
        _.times(Settings.getInstance().rowsOfSquares, (i:number) =>{
            _.times(Settings.getInstance().rowsOfSquares, (y:number) =>{
                if(charArr[i][y] == ''){
                    gridIsFull = false;
                }
            });
        });
        return gridIsFull;
    }

    /*
    * Checks for a winner
    */
    private checkWinningCondition(symbol:string):boolean {

        let isValid = true;
        for(let i = 0; i < Settings.getInstance().rowsOfSquares; i++){
            isValid = true;
            for(let y = 0; y <Settings.getInstance().rowsOfSquares; y++){
                if(this.copyGrid[i][y] != symbol){
                    isValid = false;
                    break;
                }
            }
            if(isValid) {
                return true;
            }
        }

        for(let i = 0; i < Settings.getInstance().rowsOfSquares; i++){
            isValid = true;
            for(let y = 0; y <Settings.getInstance().rowsOfSquares; y++){
                if(this.copyGrid[y][i] != symbol){
                    isValid = false;
                    break;
                }
            }
            if(isValid) {
                return true;
            }
        }

        isValid = true;
        for(let i = 0; i < Settings.getInstance().rowsOfSquares; i++){
            if(this.copyGrid[i][i] != symbol){
                isValid = false;
                break;
            }
        }
        if(isValid){
            return true;
        }
        isValid = true;
        for(let i = 0; i < Settings.getInstance().rowsOfSquares; i++){
            if(this.copyGrid[i][Settings.getInstance().rowsOfSquares-1-i] != symbol){
                isValid = false;
                break;
            }
        }
        if(isValid){
            return true;
        }

        return false;
    }

}
