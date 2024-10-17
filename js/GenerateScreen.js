import Cell from "/js/Cell.js";
import CellTypes from "/js/CellTypes.js";

export default class GenerateTable {
  constructor(size) {
    this.tableSize = size;
    this.CreateTable();
    this.AssignCells();
  }

  CreateTable() {
    const body = document.querySelector("#table");
    let gameTable = document.createElement("table");
    gameTable.className = "Game";

    for (let i = 0; i < this.tableSize; i++) {
      const row = gameTable.insertRow();
      for (let j = 0; j < this.tableSize; j++) {
        const cell = row.insertCell();

        //cell.setAttribute("data-row", `${i}`); use this method if youre going to refactor (unlikely)

        //determines which cells should be dark, and which ones should be bright to create checkerboard pattern.
        cell.style.backgroundColor = (i + j) % 2 === 0 ? "green" : "lightGreen";
        cell.className = "cell";
        gameTable.appendChild(row);
      }
      body.appendChild(gameTable);
    }
  }

  AssignCells() {
    let table = document.querySelector(".Game");
    let bombs = [];
    console.log(this.tableSize);
    //creates bomb cells
    while (bombs.length < this.tableSize) {
      let yPos = Math.floor(Math.random() * (this.tableSize - 0) + 0);
      let xPos = Math.floor(Math.random() * (this.tableSize - 0) + 0);
      let cell = table.rows[xPos].cells[yPos];
      if (bombs.includes(cell)) continue; // prevents multiple bombs from being placed on same cell.
      bombs.push(cell);
      const CellInstance = new Cell(cell, CellTypes.Bomb);
      cell.style.backgroundColor = "grey";
      cell.addEventListener("click", () => {
        CellInstance.CellClicked();
      });
      cell.addEventListener("contextmenu", () => {
        CellInstance.CellFlagged();
      });
    }

    //creates safe cells
    for (let i = 0; i < this.tableSize; i++) {
      for (let j = 0; j < this.tableSize; j++) {
        const cell = table.rows[i].cells[j];
        if (bombs.includes(cell)) continue;
        const CellInstance = new Cell(cell, CellTypes.Safe);
        cell.addEventListener("click", () => {
          CellInstance.CellClicked();
        });
        cell.addEventListener("contextmenu", () => {
          CellInstance.CellFlagged();
        });
      }
    }
  }
}
