import CellTypes from "/js/CellTypes.js";

// this is the type that changes at runtime
let type;
export default class Cell 
{
    constructor(cell, cellType)
    {
        //this is the type that is constant.
        this.cellType = cellType;
        type = cellType;
        this.cell = cell;
    }

    CellClicked()
    {
        if(type === CellTypes.Flag)
        {
            //auido or something
        }
        if(type === CellTypes.Safe)
        {
            this.CheckSoroundings();
        }
        if(type === CellTypes.Bomb)
        {
            alert("LOST");
            location.reload();
        } 
    }

    CellFlagged()
    {
        let flag = document.createElement('img');
        flag.src = "/images/Flag.jpg";
        flag.className = "cell"
        if(type === 0)
        {
            this.cell.removeChild(flag);
        }
        if(type === CellTypes.Safe)
        {
            type = CellTypes.Safe;
            this.cell.appendChild(flag);
        }
        if(type === CellTypes.Bomb && this.cellType)
        {
            console.log(this.cellType);
        }
    }

    CheckSoroundings()
    {
        console.log("Checking i guess");
    }
}