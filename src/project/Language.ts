/*
 * Class used for defining various strings
 */
export class Language{
    private static _instance: Language;
    public resetBtnText:string = "RESTART GAME";
    public resetBtnFontFamily:string = "Arial";
    public resetBtnFontSize:number = 16;
    public resetBtnFontWeight:string = "bold";
    public turnIndicatorInitialText:string = "Start game or select player";
    public turnIndicatorXtoMoveText:string = "X - Turn";
    public turnIndicatorZeroToMoveText:string = "O - Turn";
    public turnIndicatorFontFamily:string = "Arial";
    public turnIndicatorFontSize:number = 12;
    public xBtnScoreSymbol:string = "X";
    public symbolXPosition: number = 10;
    public scoreTextPosition:number = 120;
    public zeroBtnScoreSymbol:string = "O";
    public zeroScoreBtnName:string = "zeroButton";
    public xScoreBtnName:string = "xButton";
    public resetBtnName:string = "reset";
    public turnIndicatorBtnName:string = "turnIndicator";
    public easyDifficulty:string = "Easy";
    public mediumDifficulty:string = "Medium";
    public impossibleDifficulty:string = "Impossible";
    public easySelectedDifficulty:string = "EasyDifficulty";
    public mediumSelectedDifficulty:string = "MediumDifficulty";
    public impossibleSelectedDifficulty:string = "ImpossibleDifficulty";
    public dropDownMenuFontFamily:string = "Arial";
    public dropDownMenuFontSize:number = 15;
    public dropDownMenuFontStyle:string = "normal"
    public dropDownMenuFontWeight:string = "bold";
    public dropDownMenuFill:number = 0xffffff;
    public dropDownMenuStrokeColor:number = 0x4a1850;
    public dropDownMenuStrokeThickness:number = 3;
    public menuTextPositionY:number = 5;
    public menuTextPositionX:number = 25;
    public menuTextPositionOffset = 20;
    public winnerTextFontFamily:string = "Georgia";
    public winnerTextFontSize:number = 50;
    public winnerSymbolFontSize:number = 200;
    public winnerSymbolFontFamily:string = "Arial";
    public winnerAnimationWeight:string = "bold";
    public winnerMessageText:string = "WINNER !"
    public drawMessageText:string = 'Draw !';
    public turnIndicatorTextGameOver:string = "Game Over";


    private constructor() {
    }

    /*
     * Ensures that there is only a single instance of Settings and returns is.
     */
    public static getInstance(): Language {
        if(!Language._instance) {
            Language._instance = new Language();
        }
        return Language._instance;
    }


}