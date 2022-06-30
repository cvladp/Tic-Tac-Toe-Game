import { TweenMax } from "gsap";
import {Settings} from "./Settings";
import {Power4 } from 'gsap';
import {Language} from "./Language";

/*
 * Class used for drawing a square and handling its behaviour when clicked
 */
export class Square extends PIXI.Container{
    private _id: number;
    public squarePressHandler: Function;
    private _backgroundGraphics: PIXI.Graphics;
    private _symbolGraphics: PIXI.Graphics;
    private _squareSymbol: string;

    constructor(id:number) {
        super();
        this._id = id;
        this._backgroundGraphics = new PIXI.Graphics();
        this._symbolGraphics = new PIXI.Graphics();
        this.drawSquare();
        this.onClick();
        this._squareSymbol = '';
    }

    /*
     * Draws square's outer line and background
     */
    private drawSquare():void{
        this._backgroundGraphics.beginFill(Settings.getInstance().themeColor);
        this._backgroundGraphics.lineStyle(Settings.getInstance().squareLineWidth,Settings.getInstance().squareLineColor,1);
        this._backgroundGraphics.drawRect(0,0,Settings.getInstance().squareSize,Settings.getInstance().squareSize);
        this._backgroundGraphics.endFill();
        this.addChild(this._backgroundGraphics);
    }

    /*
     * Sets square interactive
     */
    public setClickable(interactive:boolean):void{
        if(interactive) {
            this.interactive = true;
            this.buttonMode = true;
        }else{
            this.interactive = false;
            this.buttonMode = false;
        }
    }

    /*
     * Sends id of clicked square to GridStage
     */
    private onClick():void{
        this.on('pointerdown', () =>{
           this.squarePressHandler(this._id);
        });
    }

    /*
     * Updating clicked square with X or 0 symbol by calling drawX
     * or drawZero methods, and removes interactivity for that square
     */
    public updateSquareSymbol(xToMove:boolean):void{
        if (xToMove) {
            this.drawX();
        } else {
            this.drawZero();
        }
        this.setClickable(false);
    }

    /*
     * Draws and animates 0 symbol on square
     */
    private drawZero():void{
        this._symbolGraphics.lineStyle(Settings.getInstance().symbolLineWidth, Settings.getInstance().zeroColor, 1);
        this._symbolGraphics.drawCircle(Settings.getInstance().squareSize/2,Settings.getInstance().squareSize/2, Settings.getInstance().squareSize/3);
        this._symbolGraphics.alpha = 0;
        this.addChild(this._symbolGraphics );
        this._symbolGraphics.x = this.x - 300;
        this.animateSymbol(this._symbolGraphics);
        this._squareSymbol = Language.getInstance().zeroBtnScoreSymbol;
    }

    /*
     * Draws and animates X symbol on square
     */
    private drawX():void{
        this._symbolGraphics.lineStyle(Settings.getInstance().symbolLineWidth, Settings.getInstance().xColor,1);
        this._symbolGraphics.moveTo(Settings.getInstance().squareSize/5, Settings.getInstance().squareSize/5);
        this._symbolGraphics.lineTo(Settings.getInstance().squareSize/1.25, Settings.getInstance().squareSize/1.25);
        this._symbolGraphics.moveTo(Settings.getInstance().squareSize/1.25, Settings.getInstance().squareSize/5);
        this._symbolGraphics.lineTo(Settings.getInstance().squareSize/5, Settings.getInstance().squareSize/1.25);
        this._symbolGraphics.alpha = 0;
        this.addChild(this._symbolGraphics);
        this._symbolGraphics.x = this.x - 300;
        this.animateSymbol(this._symbolGraphics);
        this._squareSymbol = Language.getInstance().xBtnScoreSymbol;

    }

    /*
     * Resets the square to an empty one
     */
    public resetSquare():void{
        this.hideSquare(false);
        this.removeChild(this._symbolGraphics);
        this._squareSymbol ='';
        this.setClickable(true);
        this._symbolGraphics = new PIXI.Graphics;
    }

    /*
    * Animation for square symbol
    */
    private animateSymbol(graphics:PIXI.Graphics):void{
        TweenMax.to(graphics,0.7,{alpha:1, ease: Power4.easeOut, x:0});
    }

    /*
     * Hides or displays square
     */
    public hideSquare(hide:boolean):void{
        if(hide) {
            TweenMax.to(this, 1, {alpha: 0,ease: Power4.easeIn});
        }else{
            this.alpha = 1;
        }
    }


    /*
    * Getter for symbol
    */
    public getSymbol():string{
        return this._squareSymbol;
    }

}