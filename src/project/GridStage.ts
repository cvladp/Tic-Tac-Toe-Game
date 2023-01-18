import {Settings} from "./Settings";
import {Square} from "./Square";
import * as _ from "lodash";
import {Language} from "./Language";
import {Power4, TweenMax} from "gsap";
import TimelineMax from "gsap/gsap-core";
import * as PIXI from 'pixi.js';
/*
 * Class used to add a grid filled with squares to the game,
 * and to facilitate two way communication between Game and Square classes
 */
export class GridStage extends PIXI.Container{
    private _squares:Square[];
    private _winningTextSymbol:PIXI.Text;
    private _winningTextMessage:PIXI.Text;
    public clickOnGridSquare: Function;


    constructor() {
        super();
        this.addSquaresToGrid();
    }

    /*
     * Adds a number of squares, based on values of linesOfSquares and rowsOfSquares, to the grid.
     * Also ensures communication from Square to Game class, sending id of clicked square.
     */
    private addSquaresToGrid():void{
        this._squares = [];
        let relativePoint = new PIXI.Point(0,0);
        let totalSquares = Settings.getInstance().rowsOfSquares * Settings.getInstance().rowsOfSquares;

        _.times(totalSquares, (i:number) =>{
            if(i % Settings.getInstance().rowsOfSquares == 0){
                relativePoint.x = 0;
                relativePoint.y += Settings.getInstance().squareSize;
            }else{
                relativePoint.x += Settings.getInstance().squareSize;
            }
            let sq = new Square(i);
            sq.x = relativePoint.x;
            sq.y = relativePoint.y;
            sq.squarePressHandler = (id:number) => {
                this.clickOnGridSquare(id);
            }
            sq.setClickable(true);
            this.addChild(sq);
            this._squares.push(sq);
        });
    }

    /*
     *  Ensures communication from Game to Square sending id of square to be updated,
     *  and what symbol should be drawn on that square
     */
    public updateSquare(id:number, xTurn:boolean):void{
        this._squares[id].updateSquareSymbol(xTurn);
    }

    /*
    *  Shows winning player animation
    */
    public showWinner(xWins:boolean, isADraw:boolean){
        this.toggleInteractivity(false);
        const tl1 = TimelineMax;

        if(!isADraw) {
            this._winningTextMessage = new PIXI.Text(Language.getInstance().winnerMessageText);
        }else{
            this._winningTextMessage = new PIXI.Text(Language.getInstance().drawMessageText);
        }


        if(!isADraw) {
            if (xWins) {
                this._winningTextSymbol = new PIXI.Text(Language.getInstance().xBtnScoreSymbol);
            } else {
                this._winningTextSymbol = new PIXI.Text(Language.getInstance().zeroBtnScoreSymbol);
            }
        }else{
            this._winningTextSymbol = new PIXI.Text(Language.getInstance().xBtnScoreSymbol + Language.getInstance().zeroBtnScoreSymbol);
        }

        let winningTextStyle = new PIXI.TextStyle({
                fontFamily: Language.getInstance().winnerTextFontFamily,
                fontSize: Language.getInstance().winnerTextFontSize,
                fontWeight: Language.getInstance().winnerAnimationWeight,
        });

        let winningSymbolStyle = new PIXI.TextStyle({
            fontFamily: Language.getInstance().winnerSymbolFontFamily,
            fontSize: Language.getInstance().winnerSymbolFontSize,
            fontWeight: Language.getInstance().winnerAnimationWeight,
        });
        this._winningTextSymbol.style = winningSymbolStyle;
        if(!isADraw) {
            this._winningTextSymbol.position.set(50, -100);
            this._winningTextMessage.position.set(-10, 450);
        }else{
            this._winningTextSymbol.position.set(-10, -100);
            this._winningTextMessage.position.set(35, 450);
        }
        this._winningTextMessage.style = winningTextStyle;
        this._winningTextSymbol.alpha = Settings.getInstance().showNoAlpha;
        this._winningTextMessage.alpha = Settings.getInstance().showNoAlpha;
        this.addChild(this._winningTextSymbol);
        this.addChild(this._winningTextMessage);
        let tm2 = TweenMax.to(this._winningTextSymbol,1,{alpha:1, ease: Power4.easeIn, y:20});
        let tm3 = TweenMax.to(this._winningTextMessage,1,{alpha:1, ease: Power4.easeIn, y: 250});

        this.hideSquares();
        tl1.from(tm2,{});
        tl1.from(tm3,{});

    }

    /*
     * Resets square grid when game state goes in reset
     */
    public resetGrid():void {
        this.removeChild(this._winningTextMessage, this._winningTextSymbol);
        console.log('Resseting grid');
        _.forEach(this._squares, (square) => {
            square.resetSquare();
        });
    }

    /*
    * Hides all squares
    */
    private hideSquares():void{
        _.forEach(this._squares, (square) =>{
           square.hideSquare(true);
        });
    }

    /*
    * Sets or removes interactivity for all squares
    */
    public toggleInteractivity(interactive:boolean):void{
        _.each(this._squares, (square) =>{
            if(square.getSymbol()==Language.getInstance().zeroBtnScoreSymbol || square.getSymbol()==Language.getInstance().xBtnScoreSymbol){
            }else {
                square.setClickable(interactive);
            }
        });
    }

    /*
     * Getter for squares grid
     */
    public getSquares():Square[]{
        return this._squares;
    }

}