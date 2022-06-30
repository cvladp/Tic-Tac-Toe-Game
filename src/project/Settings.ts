/*
 * Class used for defining various game settings
 */
export class Settings{
    private static _instance: Settings;
    public themeColor:number = 0x08c9b9;
    public squareSize:number = 75;
    public appWidth:number = 800;
    public appHeight:number = 600;
    public gridPositionX:number = 250;
    public gridPositionY:number = 200;
    public rowsOfSquares:number = 3;
    public squareLineWidth:number = 5;
    public squareLineColor:number = 0x1a877e;
    public zeroColor:number = 0xFFFFFF;
    public xColor:number = 0x000000;
    public symbolLineWidth:number = 7;
    public infoAreaPositionX:number = 0;
    public infoAreaPositionY:number = 0;
    public infoAreaBackgroundColor:number = 0xe8e8e8;
    public resetBtnXPosition:number = 300;
    public resetBtnYPosition:number = 565;
    public turnBtnXPosition:number = 295;
    public turnBtnYPosition:number = 200;
    public turnBtnUpdatedXPosition:number = 345;
    public scoreBtnWidth:number = 150;
    public scoreBtnHeight:number = 30;
    public scoreBtnRadius:number = 10;
    public scoreBtnLineColor:number = 0x000000;
    public scoreBtnLineWidth: number = 1;
    public xScoreBtnXposition:number = 200;
    public xScoreBtnYposition:number = 100;
    public zeroScoreBtnXposition:number = 400;
    public zeroScoreBtnYposition:number = 100;
    public gameOutterLineWidth:number = 5;
    public dropDownMenuXposition:number = 5;
    public dropDownMenuYposition:number = 15;
    public highLightLineWidth:number = 2.5;
    public highLightLineXposition: number = 6;
    public highLightLineYposition: number = 0;
    public showHalfAlpha:number = 0.5;
    public showFullAlpha:number = 1;
    public showNearZeroAlha:number = 0.000001;
    public showNoAlpha:number = 0;
    public btnBackgroundXPosition:number = 0;
    public btnBackgroundYPosition:number = 0;


    private constructor() {
    }

    /*
     * Ensures that there is only a single instance of Settings and returns is.
     */
    public static getInstance(): Settings {
        if(!Settings._instance) {
            Settings._instance = new Settings();
        }
        return Settings._instance;
    }

}