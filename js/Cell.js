import CellTypes from "/js/CellTypes.js";

export default class Cell 
{
    constructor(CellType)
    {
        const type = CellType;
        let imageType;
    }

    CellClicked()
    {
        console.log("Ive been clicked");
        if(this.type === CellTypes.Safe)
        {
            this.CheckSoroundings();
        }
        if(this.type === CellTypes.Bomb)
        {
            alert("LOST");
        } 
        if(this.type === CellTypes.Flag)
        {
            if(clickEvent.which === 2){
                this.imageType = "";
            }
        }
    }

    CellFlagged()
    {
        if(this.type === CellTypes.Safe)
            {
                TouchEvent.imageType = "";
            }
            if(this.type === CellTypes.Bomb)
            {
                
            }
            if(this.type === CellTypes.Flag)
            {
                if(clickEvent.which === 2){
                    this.imageType = CellTypes.Safe;
                }
            }
    }

    CheckSoroundings()
    {
        console.log("Checking i guess");
    }
}