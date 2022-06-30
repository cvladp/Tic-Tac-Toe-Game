import {Application} from "pixi.js";
import {GridStage} from "./GridStage";
import {Settings} from "./Settings";
import {InfoArea} from "./InfoArea";
import {Language} from "./Language";
import {GameState} from "./GameState";
import {States} from "./States";
import _ = require("lodash");
import {Square} from "./Square";
import {Easy} from "./Easy";
import PIXI = require("pixi.js");
import gsap from "gsap";
import {DifficultyContext} from "./DifficultyContext";
import {Medium} from "./Medium";
import {ImpossibleDifficulty} from "./ImpossibleDifficulty";

/*
 * Main class of tic tac toe app, command behaviour of all the other classes
 */
export class Game {
    private _app: Application;
    private _grid: GridStage;
    private _xToMove:boolean;
    private _infoArea:InfoArea;
    private _backgroundGraphics:PIXI.Graphics;
    private _stateMachine: GameState;
    private _clickedSquare:number = -1;
    private _weHaveAWinner:boolean = false;
    private _itsADraw:boolean = false;
    private _scoreTracker:number[];
    private _reset:boolean = false;
    private _contextDifficulty: DifficultyContext;

    constructor() {
        this._app = new Application({width: Settings.getInstance().appWidth, height: Settings.getInstance().appHeight, antialias: true});
        document.body.appendChild(this._app.view);

    }

    /*
     * Entry point method
     */
    public run():void{
        this._scoreTracker = [];
        this._scoreTracker[0] = 0;
        this._scoreTracker[1] = 0;
        this._stateMachine = new GameState();
        this.setStateMachineHandlers();
        this._stateMachine.setState(States.Init);
        this._contextDifficulty = new DifficultyContext(new Easy());
    }

    /*
     *  Creates the background of the game
     */
    private setBackground():void{
        this._backgroundGraphics = new PIXI.Graphics();
        this._backgroundGraphics.beginFill(Settings.getInstance().infoAreaBackgroundColor);
        this._backgroundGraphics.drawRect(0,0,screen.width, 230);
        this._backgroundGraphics.endFill();

        this._backgroundGraphics.beginFill(Settings.getInstance().themeColor);
        this._backgroundGraphics.drawRect(0,230,screen.width,320);
        this._backgroundGraphics.endFill();

        this._backgroundGraphics.beginFill(Settings.getInstance().infoAreaBackgroundColor);
        this._backgroundGraphics.drawRect(0,550,screen.width, 100);
        this._backgroundGraphics.endFill();

        this._backgroundGraphics.lineStyle(Settings.getInstance().gameOutterLineWidth);
        this._backgroundGraphics.drawRect(0,0,this._app.view.width, this._app.view.height);

        this._app.stage.addChild(this._backgroundGraphics);
    }

    /*
     * Handler function for init state
     */
    private handleInitState():void{
        if(!this._reset) {
            this.setBackground();
            this.addGrid();
            this.addInfoArea();
            this.clickFromInfoArea();
            this.clickFromGridStage();
            this._weHaveAWinner = false;
            this._xToMove = true;
            this._reset = true;
        }else{
            this._grid.resetGrid();
            this._weHaveAWinner = false;
            this._itsADraw = false;
            this._xToMove = true;
            this._grid.toggleInteractivity(true);
            this._infoArea.toggleScoreBtnInteractivity(true);
            this._infoArea.highlightBtn(this._xToMove);
            this._infoArea.resetTurnIndicator();
        }
    }

    /*
     * Handler function for Player move state
    */
    private handlePlayerMoveState():void{

        this._grid.updateSquare(this._clickedSquare,this._xToMove);
        this._infoArea.toggleScoreBtnInteractivity(false);
        this._grid.toggleInteractivity(false);
        this._grid.interactive = false;
        this._infoArea.updateTurnIndicator(!this._xToMove);
        this.checkWinningCondition();
        this._xToMove = !this._xToMove;
        this._infoArea.highlightBtn(this._xToMove);
        this._infoArea.showDropDownMenu(false);

        if(this._weHaveAWinner == false && this._itsADraw == false) {
            this._stateMachine.setState(States.ComputerMove);
        }
    }

    /*
     * Handler function for Computer move state
    */
    private handleComputerMoveState():void{
        let computerSymbol:string;
        if(this._xToMove){
            computerSymbol = Language.getInstance().xBtnScoreSymbol;
        }else{
            computerSymbol = Language.getInstance().zeroBtnScoreSymbol;
        }

        this._grid.toggleInteractivity(false);
        gsap.delayedCall(_.random(0.5,2),()=>{
            this._infoArea.toggleScoreBtnInteractivity(false);
            this._grid.toggleInteractivity(false);
            let computerMove: number = this._contextDifficulty.executeStrategy(this._grid.getSquares(),computerSymbol);
            this._grid.updateSquare(computerMove, this._xToMove);
            this._infoArea.updateTurnIndicator(!this._xToMove);
            this.checkWinningCondition();
            this._xToMove = !this._xToMove;
            this._infoArea.highlightBtn(this._xToMove);
            this._infoArea.showDropDownMenu(false);
            if(this._weHaveAWinner == false && this._itsADraw == false) {
                this._grid.toggleInteractivity(true);
            }
        });
    }

    /*
    * Handler function for game over state
    */
    private handleGameOverState():void{
        this._grid.toggleInteractivity(false);
        this._infoArea.setScore(this._scoreTracker);
        this._infoArea.gameOverTurnIndicator();
        this._grid.showWinner(this._xToMove, this._itsADraw);
        this._grid.interactive = false;
    }

    /*
     *  Creates an instance of GridStage class and adds it to stage
     */
    private addGrid():void{
        this._grid = new GridStage();
        this._grid.x = Settings.getInstance().gridPositionX;
        this._grid.y = Settings.getInstance().gridPositionY;
        this._app.stage.addChild(this._grid);
    }

    /*
    *  Creates an instance of InfoArea class and adds it to stage
    */
    private addInfoArea():void{
        this._infoArea = new InfoArea();
        this._infoArea.x = Settings.getInstance().infoAreaPositionX;
        this._infoArea.y = Settings.getInstance().infoAreaPositionY;
        this._app.stage.addChild(this._infoArea);
    }

    /*
     * Reads id of what square has been clicked on and sends information
     * on what symbol to be drawn on that respective square
     */
    private clickFromGridStage():void{
        this._grid.clickOnGridSquare = (id: number) => {
           this._clickedSquare = id;
           this._stateMachine.setState(States.PlayerMove);
        }
    }

    /*
    *  Sets handler functions
    */
    private setStateMachineHandlers():void{
        this._stateMachine.changeToInit = this.handleInitState.bind(this);
        this._stateMachine.changeToPlayerMove = this.handlePlayerMoveState.bind(this);
        this._stateMachine.changeToComputerMove = this.handleComputerMoveState.bind(this);
        this._stateMachine.changeToGameOver = this.handleGameOverState.bind(this);
    }

    /*
    * Reads name of what button has been clicked on
    */
    private clickFromInfoArea():void{
        let option:string;
        this._infoArea.clickOnInfoArea = (btnName: string) => {

            option = btnName;
            if (btnName.endsWith('Difficulty')) {
                option = 'openMenu';
            } else {
                option = btnName;
            }
            switch (option) {
                case 'openMenu':
                    this._infoArea.showDropDownMenu(true);
                    console.log("You've opened the menu")
                    break;
                case Language.getInstance().resetBtnName:
                    console.log("Restarting game...");

                    this._stateMachine.setState(States.Init);
                    break;
                case Language.getInstance().xScoreBtnName:
                    console.log("Clicked on "+ option);
                    this._infoArea.showDropDownMenu(false);
                    this._infoArea.toggleScoreBtnInteractivity(false);
                    break;
                case Language.getInstance().zeroScoreBtnName:
                    console.log("Clicked on " + option);
                    this._infoArea.toggleScoreBtnInteractivity(false);
                    this._infoArea.showDropDownMenu(false);
                    this._stateMachine.setState(States.ComputerMove);
                    break;
                case Language.getInstance().easyDifficulty:
                    console.log('Selected Easy difficulty');
                    this._contextDifficulty.setStrategy(new Easy());
                    this._stateMachine.setState(States.Init);
                    this._infoArea.setDifficulty(Language.getInstance().easySelectedDifficulty);
                    break;
                case Language.getInstance().mediumDifficulty:
                    console.log('Selected Medium difficulty');
                    this._contextDifficulty.setStrategy(new Medium());
                    this._stateMachine.setState(States.Init);
                    this._infoArea.setDifficulty(Language.getInstance().mediumSelectedDifficulty);
                    break;
                case Language.getInstance().impossibleDifficulty:
                    console.log('Selected Impossible difficulty');
                    this._contextDifficulty.setStrategy(new ImpossibleDifficulty());
                    this._stateMachine.setState(States.Init);
                    this._infoArea.setDifficulty(Language.getInstance().impossibleSelectedDifficulty);
                    break;
                default:
                    console.log('THIS WILL NEVER BE DISPLAYED');
                    break;
            }
        }
    }

    /*
     * Checks if a winning condition is met
     */
    private checkWinningCondition():boolean {

        let myArr:Square[][];
        myArr = this.convertTo2dArray();
        let winnerDetected:boolean = false;

        _.times(Settings.getInstance().rowsOfSquares, (i:number) =>{
            winnerDetected = true;
           _.times(Settings.getInstance().rowsOfSquares-1, (y:number) =>{
               if(myArr[i][y].getSymbol() == "") {
                   winnerDetected = false;
                   return true;
               }
               if (myArr[i][y].getSymbol() != myArr[i][y + 1].getSymbol()) {
                   winnerDetected = false;
               }
           });
            if(winnerDetected == true){
                this._weHaveAWinner = true;
            }
        });

        _.times(Settings.getInstance().rowsOfSquares, (i:number) =>{
            winnerDetected = true;
            _.times(Settings.getInstance().rowsOfSquares-1, (y:number) =>{
                if(myArr[y][i].getSymbol() == "") {
                    winnerDetected = false;
                    return true;
                }
                if(myArr[y][i].getSymbol() != myArr[y+1][i].getSymbol()){
                    winnerDetected = false;
                }
            });
            if(winnerDetected == true){
                this._weHaveAWinner = true;
            }
        });

        winnerDetected = true;
        _.times(Settings.getInstance().rowsOfSquares-1, (i:number) =>{
            if(myArr[i][i].getSymbol() ==""){
                winnerDetected = false;
                return true;
            }
            if(myArr[i][i].getSymbol() != myArr[i+1][i+1].getSymbol()){
                winnerDetected = false;
            }
        });
        if(winnerDetected == true){
            this._weHaveAWinner = true;
        }

        winnerDetected = true;
        _.times(Settings.getInstance().rowsOfSquares-1, (i:number) =>{
            if(myArr[i][Settings.getInstance().rowsOfSquares-1-i].getSymbol() == ""){
                winnerDetected = false;
                return true;
            }
            if(myArr[i][Settings.getInstance().rowsOfSquares-1-i].getSymbol() != myArr[i+1][Settings.getInstance().rowsOfSquares-2-i].getSymbol()){
                winnerDetected = false;
            }
        });
        if(winnerDetected == true){
            this._weHaveAWinner = true;
        }

        if(this._weHaveAWinner){
            if(this._xToMove){
                this._scoreTracker[0]++;
            }else{
                this._scoreTracker[1]++;
            }
            this._infoArea.setScore(this._scoreTracker);
            this._stateMachine.setState(States.GameOver);
            return this._weHaveAWinner;
        }
        if(this.checkIfGridIsFull()){
            this._stateMachine.setState(States.GameOver);
            return this._itsADraw;
        }
        return this._weHaveAWinner;
    }

    /*
     * Checks if all squares have been clicked on
     */
    private checkIfGridIsFull():boolean{
        let squaresArr = this._grid.getSquares();
        let squaresOccupied:number = 0;
        _.forEach(squaresArr, (square)=>{
            if(square.getSymbol()===Language.getInstance().xBtnScoreSymbol || square.getSymbol()===Language.getInstance().zeroBtnScoreSymbol){
                squaresOccupied++;
            }
        });
        if(squaresOccupied == squaresArr.length && this._weHaveAWinner == false){
            this._itsADraw = true;
            return this._itsADraw;
        }
        return this._itsADraw;
    }

    /*
    *  Creates an 2d array from squares array
    */
    private convertTo2dArray():Square[][] {
        let mySquares = [...this._grid.getSquares()];
        let localMatrix: Square[][];
        localMatrix = [];
        while(mySquares.length) {
            localMatrix.push(mySquares.splice(0, Settings.getInstance().rowsOfSquares));
        }
        return localMatrix;
    }
}
