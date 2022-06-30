import {Button} from "./Button";
import {Settings} from "./Settings";
import {Power4,Back,TweenMax} from "gsap";
import {Language} from "./Language";

/*
 * Sub class of Button type used only for score pannel buttons
 */
export class ScoreButton extends Button{

    private _backGroundGraphics: PIXI.Graphics;
    private _highlightGraphics: PIXI.Graphics;
    private _score:number;
    private _scoreText:PIXI.Text;
    private _symbol:string;

    constructor(name:string, symbol:string) {
        super(name, true);
        this._backGroundGraphics = new PIXI.Graphics();
        this._highlightGraphics = new PIXI.Graphics();
        this._score = 0;
        this._symbol = symbol;
        this.addBtnBackground();
        this.addScoreOnButton();
        this._pixiText.text = this._symbol;
        this._pixiText.x = Language.getInstance().symbolXPosition;
    }

    /*
     * Draws button background
     */
    private addBtnBackground():void{
         this._backGroundGraphics.beginFill(Settings.getInstance().themeColor,Settings.getInstance().showNearZeroAlha);
         this._backGroundGraphics.lineStyle(Settings.getInstance().scoreBtnLineWidth, Settings.getInstance().scoreBtnLineColor,Settings.getInstance().showFullAlpha);
         this._backGroundGraphics.drawRoundedRect(Settings.getInstance().btnBackgroundXPosition,Settings.getInstance().btnBackgroundYPosition, Settings.getInstance().scoreBtnWidth,
           Settings.getInstance().scoreBtnHeight, Settings.getInstance().scoreBtnRadius);
         this._backGroundGraphics.endFill();
         this.addChild(this._backGroundGraphics);
    }

    /*
     * Turns next player indicator on and off
     */
    public toggleHighlightBtn(highlight:boolean):void{
        this._highlightGraphics.lineStyle(Settings.getInstance().highLightLineWidth,Settings.getInstance().themeColor,Settings.getInstance().showFullAlpha);
        this._highlightGraphics.moveTo(Settings.getInstance().highLightLineXposition,Settings.getInstance().highLightLineYposition);
        this._highlightGraphics.lineTo(Settings.getInstance().scoreBtnWidth-Settings.getInstance().highLightLineXposition, Settings.getInstance().highLightLineYposition);

        if(highlight){
            TweenMax.to(this._highlightGraphics,0.5,{x:0, y:Settings.getInstance().scoreBtnHeight,alpha:1,ease: Back.easeOut, width:Settings.getInstance().scoreBtnWidth-12})
        }else{
            TweenMax.to(this._highlightGraphics,0.5,{x:0,y:-50, alpha:0,ease: Power4.easeOut,width:10});
        }
        this.addChild(this._highlightGraphics);
    }

    /*
    * Adds score text to the button
    */
    private addScoreOnButton():void{
        this._scoreText = new PIXI.Text('-');
        this._scoreText.x = Language.getInstance().scoreTextPosition;
        this.addChild(this._scoreText);
    }

    /*
    * Increases button score
    */
    public updateScore(score:number){
        this._score = score
        if(this._score > 0){
            this._scoreText.text = this._score.toString();
        }
    }
}