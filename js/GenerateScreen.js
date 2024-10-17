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
      this.AppendCellClassToTableCell(cell, CellInstance);
      cell.style.backgroundColor = "grey";
    }

    //creates safe cells
    for (let i = 0; i < this.tableSize; i++) {
      for (let j = 0; j < this.tableSize; j++) {
        const cell = table.rows[i].cells[j];
        if (bombs.includes(cell)) continue;
        const CellInstance = new Cell(cell, CellTypes.Safe);
        this.AppendCellClassToTableCell(cell, CellInstance);
      }
    }
  }

  //make it part of a util class or something cleaner
  AppendCellClassToTableCell(element, cell) {
    const htmlSnippet = `
            <div class="cell"> 
                <script type="module">
                    import Cell from "/js/Cell.js";
                    import CellTypes from "/js/CellTypes.js";
                    '${element.addEventListener("click", () => {
                        cell.CellClicked();
                    })};'

                    '${element.addEventListener("contextmenu", () => {
                        cell.CellFlagged();
                    })};'
                    
                </script>
            </div>
        `;

    element.innerHTML = htmlSnippet;
    //finds any old code and replaces it with the new code passed
    Array.from(element.querySelectorAll("script")).forEach((previousCode) => {
      const newCode = document.createElement("script");
      Array.from(previousCode.attributes).forEach((attribute) =>
        newCode.setAttribute(attribute.name, attribute.value)
      );
      newCode.appendChild(document.createTextNode(previousCode.innerHTML));
      previousCode.parentNode.replaceChild(newCode, previousCode);
    });
  }
}
