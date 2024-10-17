import CellTypes from "/js/CellTypes.js";
export default class Cell {
  constructor(cell, cellType) {
    this.cellType = cellType;
    this.cell = cell;
  }

  CellClicked() {
    //checks if the cell contains a flag, if it does it simply exits the function.
    if (this.cell.childNodes[0] != null) return;

    if (this.cellType === CellTypes.Bomb) {
      alert("LOST");
      location.reload();
    }
    if (this.cellType === CellTypes.Safe) {
      this.CheckSoroundings();
    }
  }

  CellFlagged() {
    let flag = document.createElement("img");
    flag.src = "/images/Flag.jpg";
    flag.id = "flag";

    if (this.cell.childNodes[0] != null) {
      this.cell.childNodes[0].remove();
      return;
    }
    this.cell.appendChild(flag);
  }

  CheckSoroundings() {
    //must call this function on sorounding cells.
    let xIndex;
    let yIndex;
    let soroundingCells = [];
    //finds sorounding cells
    let table = document.querySelector(".Game");
    for (let i = 0; i < table.rows.length; i++) {
      for (let j = 0; j < table.rows[i].cells.length; j++) {
        if (table.rows[i].cells[j] === this.cell) {
          this.cell.style.backgroundColor = "darkslategrey";
          xIndex = j;
          yIndex = i;

          //true if there are cells to the left
          if (xIndex > 0) {
            soroundingCells.push(table.rows[yIndex].cells[xIndex - 1]); // left
            //true if there are cells to the left and above
            if (yIndex > 0) {
              soroundingCells.push(table.rows[yIndex - 1].cells[xIndex - 1]); //left up
            }
            //true if there are cells to the left and below
            if (yIndex < table.rows[i].cells.length - 1) {
              soroundingCells.push(table.rows[yIndex + 1].cells[xIndex - 1]); // left down
            }
          }
          //true if there are cells to the right
          if (xIndex < table.rows.length - 1) {
            soroundingCells.push(table.rows[yIndex].cells[xIndex + 1]); // right
            //true if there are cells to the right and above
            if (yIndex > 0) {
              soroundingCells.push(table.rows[yIndex - 1].cells[xIndex + 1]); // right up
            }
            //true if there are cells to the right and below
            if (yIndex < table.rows[i].cells.length - 1) {
              soroundingCells.push(table.rows[yIndex + 1].cells[xIndex + 1]); // right down
            }
          }
          //true if there are cells above
          if (yIndex > 0) {
            soroundingCells.push(table.rows[yIndex - 1].cells[xIndex]); // up
          }
          //true if there are cells below
          if (yIndex < table.rows[i].cells.length - 1) {
            soroundingCells.push(table.rows[yIndex + 1].cells[xIndex]); // down
          }
          break;
        }
      }
    }
    //calls the same 'checkSoroundings()' function on the sorounding scripts.
    soroundingCells.forEach((cell) => {
      if (cell.childNodes[0] == null) {
        const htmlSnippet = `
            <div> soroundings
                <script type="module">
                    import Cell from "/js/Cell.js";
                    import CellTypes from "/js/CellTypes.js";
                    if(true) { 
                      const cell = new Cell('${cell}', '${this.cellType}');
                      cell.CheckSoroundings();
                    }
                </script>
            </div>
        `;
        this.AppendCodeToElement(cell, htmlSnippet);
      }
    });
  }
}
