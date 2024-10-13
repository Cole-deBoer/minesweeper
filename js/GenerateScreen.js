export default class GenerateTable
{
    constructor(){
        this.CreateTable();
    }

    CreateTable() 
    {
        const body = document.getElementsByTagName('main')[0];
        let gameTable = document.createElement("table");
        gameTable.className = "Game"; 

        for (let i = 0; i < 16; i++) {
            const row = gameTable.insertRow();
            for (let j = 0; j < 16; j++) {
                const cell = row.insertCell();
                //determines which cells should be dark, and which ones should be bright to create checkerboard pattern.
                if ((i + j) % 2 === 0) {
                    cell.className = "even-cell";
                }
                else {
                    cell.className = "odd-cell";
                }
                gameTable.appendChild(row);
            }
            body.appendChild(gameTable);
        }
    }
}