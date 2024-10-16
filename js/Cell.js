import CellTypes from "/js/CellTypes.js";
export default class Cell 
{
    constructor(cell, cellType)
    {
        this.cellType = cellType;
        this.cell = cell;
    }

    CellClicked()
    {
        if(this.cellType === CellTypes.Bomb)
        {
            alert("LOST");
            location.reload();
        } 
        if(this.cellType === CellTypes.Flag)
        {
            //auido or something
        }
        if(this.cellType === CellTypes.Safe)
        {
            this.CheckSoroundings();
        }
    }

    CellFlagged()
    {
        let flag = document.createElement('img');
        flag.src = "/images/Flag.jpg";
        flag.className = "cell"
        if(this.cellType === CellTypes.Safe)
        {
            this.cell.removeChild(flag);
        }
        if(this.cellType === CellTypes.Safe)
        {
            this.cellType = CellTypes.Safe; //THIS DOESNT WORK BECAUSE ITS VALUES PASSED THROUGH PARAMTER ARE CONSTANT.
            this.cell.appendChild(flag);
        }
        if(this.cellType === CellTypes.Bomb)
        {
            console.log(this.cellType);
        }
    }

    CheckSoroundings()
    {
        console.log("Checking i guess");
    }
}