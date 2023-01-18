import {States} from "./States";


/*
 * Class used for tracking and handling game states
*/
export class GameState{

    private _state: States;
    public changeToInit: Function;
    public changeToPlayerMove: Function;
    public changeToGameOver: Function;
    public changeToComputerMove: Function;

    constructor() {
    }


    /*
     * Calls handler for current state
    */
    private moveToNextState():void{
        switch (this._state){
            case States.Init:
               this.changeToInit();
                break;
            case States.PlayerMove:
                this.changeToPlayerMove();
                break;
            case States.ComputerMove:
                this.changeToComputerMove();
                break;
            case States.GameOver:
                this.changeToGameOver();
                break;
        }
    }

    /*
     * Sets game state
    */
    public setState(States:States):void{
        this._state = States;
        this.moveToNextState();
    }

}