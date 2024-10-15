import Cell from "/js/Cell.js";
import CellTypes from "/js/CellTypes.js";

export default class GenerateTable
{
    constructor(size)
    {
        this.CreateTable(size);
        this.AssignMines(size);
    }

    CreateTable(tableSize) 
    {
        //subtracts by one, otherwise itw ould create a table one row and column larger than the value passed.
        const body = document.querySelector('#table');
        let gameTable = document.createElement("table");
        gameTable.className = "Game"; 
        
        for (let i = 0; i < tableSize; i++) {
            const row = gameTable.insertRow();
            for (let j = 0; j < tableSize; j++) {
                const cell = row.insertCell();
                //determines which cells should be dark, and which ones should be bright to create checkerboard pattern.
                if ((i + j) % 2 === 0) {
                    cell.className = "cell";
                    cell.style.backgroundColor = "green";
                }
                else {
                    cell.className = "cell";
                    cell.style.backgroundColor = "lightgreen";
                }
                cell.addEventListener('mousedown', (event) => {
                    const cell = new Cell(event);
                    cell.CellClicked(event);
                });
                gameTable.appendChild(row);
            }
            body.appendChild(gameTable);
        }
    }

    AssignMines(size)
    {
        let bombCount = 0;
        let table = document.querySelector('.Game');
        console.log(size);
        while(bombCount < size)
        {
            const bomb = CellTypes.bomb;
            bombCount += 1;
            let xPos = Math.floor(Math.random() * (size - 0) + 0);
            let yPos = Math.floor(Math.random() * (size - 0) + 0);
            table.rows[xPos].cells[yPos].style.backgroundColor = "grey";
            table.rows[xPos].cells[yPos].addEventListener("click", () => {
                const cell = new Cell(bomb);
                cell.CellClicked();
            });

            table.rows[xPos].cells[yPos].addEventListener("contextmenu", () => {

                const cell = new Cell(bomb);
                cell.CellFlagged();
            });
        }
    }
}