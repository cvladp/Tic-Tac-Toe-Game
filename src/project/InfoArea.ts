import {Button} from "./Button";
import {ScoreButton} from "./ScoreButton";
import {Settings} from "./Settings";
import {Language} from "./Language";
import {DropDownMenu} from "./DropDownMenu";
import * as PIXI from 'pixi.js';
/*
 * Class used to add a buttons to the game
 * and to facilitate two way communication between Game and Button classes
 */
export class InfoArea extends PIXI.Container{

    private _resetBtn:Button;
    private _turnIndicatorBtn:Button;
    private _xScoreBtn:ScoreButton;
    private _zeroScoreBtn:ScoreButton;
    public clickOnInfoArea: Function;
    private _dropDownMenu: DropDownMenu;

    constructor() {
        super();
        this.addResetBtn();
        this.addTurnIndicatorBtn();
        this.addXScoreBtn();
        this.addZeroScoreBtn();
        this.addDropDownMenu();
    }

    /*
    * Adding drop down menu for difficulty selection
    */
    private addDropDownMenu():void{
        this._dropDownMenu = new DropDownMenu();
        this._dropDownMenu.x = Settings.getInstance().dropDownMenuXposition;
        this._dropDownMenu.y = Settings.getInstance().dropDownMenuYposition;
        this.clickFromDropDownMenu();
        this.addChild(this._dropDownMenu);
    }

    /*
     * Adding the reset button
     */
    private addResetBtn():void{
        const resetBtnStyle:PIXI.TextStyle = new PIXI.TextStyle({
            fontFamily: Language.getInstance().resetBtnFontFamily,
            fontSize: Language.getInstance().resetBtnFontSize,
            fontWeight: Language.getInstance().resetBtnFontWeight,
            fill: [Settings.getInstance().themeColor],
            });
        this._resetBtn = new Button(Language.getInstance().resetBtnName, true );
        this._resetBtn.x = Settings.getInstance().resetBtnXPosition;
        this._resetBtn.y = Settings.getInstance().resetBtnYPosition;
        this._resetBtn.setText(Language.getInstance().resetBtnText);
        this._resetBtn.setStyle(resetBtnStyle);
        this.addClickHandler(this._resetBtn);
        this.addChild(this._resetBtn);
    }

    /*
    * Adding the turn indicator button
    */
    private addTurnIndicatorBtn():void{
        const turnIndicatorStyle:PIXI.TextStyle = new PIXI.TextStyle({
            fontFamily: Language.getInstance().turnIndicatorFontFamily,
            fontSize: Language.getInstance().turnIndicatorFontSize,
        });
        this._turnIndicatorBtn = new Button(Language.getInstance().turnIndicatorBtnName, false);
        this._turnIndicatorBtn.x = Settings.getInstance().turnBtnXPosition;
        this._turnIndicatorBtn.y = Settings.getInstance().turnBtnYPosition;
        this._turnIndicatorBtn.setText(Language.getInstance().turnIndicatorInitialText);
        this._turnIndicatorBtn.setStyle(turnIndicatorStyle);
        this.addChild(this._turnIndicatorBtn);
    }

    /*
    * Changes turn indicator button text
    */
    public updateTurnIndicator(xToMove:boolean):void{
        this._turnIndicatorBtn.x = Settings.getInstance().turnBtnUpdatedXPosition;
        if(xToMove) {
            this._turnIndicatorBtn.setText(Language.getInstance().turnIndicatorXtoMoveText);
        }else{
            this._turnIndicatorBtn.setText(Language.getInstance().turnIndicatorZeroToMoveText);
        }
    }

    /*
    * Changes turn indicator button text when game resets
    */
    public resetTurnIndicator():void{
        this._turnIndicatorBtn.x = Settings.getInstance().turnBtnXPosition;
        this._turnIndicatorBtn.setText(Language.getInstance().turnIndicatorInitialText);
    }

    /*
    * Changes turn indicator button text in game over state
    */
    public gameOverTurnIndicator():void{
        this._turnIndicatorBtn.setText(Language.getInstance().turnIndicatorTextGameOver);
    }

    /*
     * Adding button for tracking X player score
     */
    private addXScoreBtn():void{
        this._xScoreBtn = new ScoreButton(Language.getInstance().xScoreBtnName, Language.getInstance().xBtnScoreSymbol);
        this._xScoreBtn.x = Settings.getInstance().xScoreBtnXposition;
        this._xScoreBtn.y = Settings.getInstance().xScoreBtnYposition;
        this._xScoreBtn.toggleHighlightBtn(true);
        this.addClickHandler(this._xScoreBtn);
        this.addChild(this._xScoreBtn);
    }

    /*
     * Toggles score indicator buttons interactivity
     */
    public toggleScoreBtnInteractivity(toggle:boolean):void{
            this._xScoreBtn.setClickable(toggle);
            this._zeroScoreBtn.setClickable(toggle)
    }

    /*
    * Adding button for tracking O player score
    */
    private addZeroScoreBtn():void{
        this._zeroScoreBtn = new ScoreButton(Language.getInstance().zeroScoreBtnName,Language.getInstance().zeroBtnScoreSymbol);
        this._zeroScoreBtn.x = Settings.getInstance().zeroScoreBtnXposition;
        this._zeroScoreBtn.y = Settings.getInstance().zeroScoreBtnYposition;
        this.addClickHandler(this._zeroScoreBtn);
        this.addChild(this._zeroScoreBtn);
    }

    /*
    * Updates x and 0 score
    */
    public setScore(scoreTracker:number[]){
        this._xScoreBtn.updateScore(scoreTracker[0]);
        this._zeroScoreBtn.updateScore(scoreTracker[1]);
    }

    /*
    * Adding click handler function to a button, used for sending button name to Game
    */
    private addClickHandler(btn: Button):void{
        btn.btnPressHandler = (name:string) => {
            this.clickOnInfoArea(name);
        }
    }

    /*
    * Decides which button gets highlighted
    */
    public highlightBtn(xToMove:boolean):void{
       if(xToMove){
           this._xScoreBtn.toggleHighlightBtn(true);
           this._zeroScoreBtn.toggleHighlightBtn(false);
       }else{
           this._zeroScoreBtn.toggleHighlightBtn(true);
           this._xScoreBtn.toggleHighlightBtn(false);
       }
    }

    /*
    * Sends name of clicked button from drop down menu to Game
    */
    private clickFromDropDownMenu():void{
        this._dropDownMenu.clickOnDropMenu = (name:string) =>{
            this.clickOnInfoArea(name);
        }
    }

    /*
    *   Hides or displays drop menu
    */
    public showDropDownMenu(show:boolean):void{
        this._dropDownMenu.showAllOptions(show);
    }

    /*
    *  Sets selected difficulty
    */
    public setDifficulty(difficulty:string):void{
        this._dropDownMenu.updateSelectedOption(difficulty);
    }

}