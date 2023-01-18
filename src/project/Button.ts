import * as PIXI from 'pixi.js';
/*
 * Class used for creating buttons
 */
export class Button extends PIXI.Container{

    protected _pixiText: PIXI.Text;
    private _name:string;
    public btnPressHandler:Function;


    constructor(name:string, interactive:boolean) {
        super();
        this._name = name;
        this._pixiText = new PIXI.Text('');
        this.setClickable(interactive);
        this.onClick();
        this.addChild(this._pixiText);
    }

   /*
    * Function used to set text style
    */
    public setStyle(style:PIXI.TextStyle):void{
        this._pixiText.style = style;
    }

   /*
    * Function used to text to be displayed on button
    */
    public setText(text:string):void{
        this._pixiText.text = text;
    }

   /*
    * Decides if button should be interactive or not
    */
    public setClickable(interactivity:boolean){
        if(interactivity){
            this.interactive = true;
            this.buttonMode = true;
        }else{
            this.interactive = false;
            this.buttonMode = false;
        }
    }

   /*
    * Sends name of clicked button to InfoArea
    */
    private onClick():void{
        this.on('pointerdown', () =>{
           this.btnPressHandler(this._name);
        });
    }

   /*
    * Getter for button name
    */
    public getName():string{
        return this._name;
    }

}


