import {Button} from "./Button";
import _ = require("lodash");
import {Language} from "./Language";
import {Settings} from "./Settings";

/*
 * Class used for creating a difficulty selector drop down menu
 */
export class DropDownMenu extends PIXI.Container {

    private _menuOptions: Button[];
    private _selectedOption: Button;
    public clickOnDropMenu: Function;
    private _menuIsShowing:boolean;
    private _selectableDifficulties: Button[];

    constructor() {
        super();
        this.addMenuOptions();
        this.addDifficultyOptions();
        this.updateSelectedOption(Language.getInstance().easySelectedDifficulty);
    }

    /*
     * Adds 3 buttons, one for each difficulty,
     * to be displayed as clickable options
     */
    private addMenuOptions(): void {
        this._menuOptions = [];
        this._menuOptions[0] = new Button(Language.getInstance().easyDifficulty, true);
        this._menuOptions[1] = new Button(Language.getInstance().mediumDifficulty, true);
        this._menuOptions[2] = new Button(Language.getInstance().impossibleDifficulty, true);

        const style = new PIXI.TextStyle({
            fontFamily: Language.getInstance().dropDownMenuFontFamily,
            fontSize: Language.getInstance().dropDownMenuFontSize,
            fontWeight: Language.getInstance().dropDownMenuFontWeight,
        });
        let textPosition:number = Language.getInstance().menuTextPositionY;
        _.forEach(this._menuOptions, (option: Button) => {
            textPosition += Language.getInstance().menuTextPositionOffset;
            option.setText(option.getName());
            option.setStyle(style);
            this.addClickHandler(option);
            option.y = textPosition;
            option.x = Language.getInstance().menuTextPositionX;
            option.on('pointerover',() =>{
                option.alpha = Settings.getInstance().showHalfAlpha;
            });
            option.on('pointerout', () =>{
                option.alpha = Settings.getInstance().showFullAlpha;
            });
            option.alpha = Settings.getInstance().showNoAlpha;
            this.addChild(option);
        });
    }

    /*
      * Adds 3 buttons with style, one for each difficulty,
      * to be used as picked difficulty
      */
    private addDifficultyOptions():void{
        const style = new PIXI.TextStyle({
            fontFamily: Language.getInstance().dropDownMenuFontFamily,
            fontSize: Language.getInstance().dropDownMenuFontSize,
            fontStyle: Language.getInstance().dropDownMenuFontStyle,
            fontWeight: Language.getInstance().dropDownMenuFontWeight,
            fill: [Language.getInstance().dropDownMenuFill, Settings.getInstance().themeColor],
            stroke: Language.getInstance().dropDownMenuStrokeColor,
            strokeThickness: Language.getInstance().dropDownMenuStrokeThickness,
        });
        this._selectableDifficulties = [];
        this._selectableDifficulties[0] = new Button(Language.getInstance().easySelectedDifficulty, true);
        this._selectableDifficulties[1] = new Button(Language.getInstance().mediumSelectedDifficulty, true);
        this._selectableDifficulties[2] = new Button(Language.getInstance().impossibleSelectedDifficulty, true);

        _.forEach(this._selectableDifficulties, (btn:Button) =>{
            btn.setText('▼  ' + btn.getName().substr(0,btn.getName().indexOf('Difficulty')));
            btn.setStyle(style);
            this.addClickHandler(btn);
            this.addChild(btn);
        });
        this._selectedOption = this._selectableDifficulties[1];
    }

   /*
    * Updates difficulty button
    */
    public updateSelectedOption(optionName:string):void{
        if(optionName != this._selectedOption.getName()) {
            this.toggleButtonsVisibility(this._selectableDifficulties,false);
            this._selectedOption =
                _.find(this._selectableDifficulties, (btn:Button) =>{
                    return btn.getName() === optionName;
            });
            this._selectedOption.setClickable(true);
            this._selectedOption.alpha = Settings.getInstance().showFullAlpha;
        }
        this.toggleButtonsVisibility(this._menuOptions,false);
        this._menuIsShowing = false;
    }

   /*
    * Displays and hides difficulty options menu
    */
    public showAllOptions(showMenu: boolean):void{
        if(showMenu && !this._menuIsShowing) {
            this._menuIsShowing = true;
            this.toggleButtonsVisibility(this._menuOptions,true);
        }else{
            this._menuIsShowing = false;
            this.toggleButtonsVisibility(this._menuOptions,false);
        }
    }

   /*
    * Sets every member of buttons array to be interactive and visible
    */
    private toggleButtonsVisibility(btns:Button[],interactive: boolean):void{
        _.forEach(btns, (btn: Button) =>{
            btn.setClickable(interactive);
            if(interactive) {
                btn.alpha = Settings.getInstance().showFullAlpha;
            }else{
                btn.alpha = Settings.getInstance().showNoAlpha;
            }
        });
    }

   /*
    * Sends name of pressed button to InfoArea
    */
    private addClickHandler(btn:Button):void{
        btn.btnPressHandler = (name: string) =>{
            this.clickOnDropMenu(name);
        }
    }
}