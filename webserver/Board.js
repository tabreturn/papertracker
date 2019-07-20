/**
 * Board module for drawing and controlling the board, and cells array.
 * @module Board
 */

export class Board {
  /**
   * Create a new board; ordinarily, just only one is required.
   * @param {number} size=50 Width/height of each cell in pixels.
     @param {number} rows=9 Number of rows in the grid.
     @param {number} cols=12 Number of columns in the grid.
     @param {number} speed=5 Game speed.
   */
  constructor(size=50, rows=9, cols=12, speed=5) {
    // config variables
    this.cells = [];
    this.size = size;
    this.rows = rows;
    this.cols = cols;
    this.speed = speed;
  }
  /**
   * Populate the cells array and add all of the (blank) cell divs to board.
   */
  setupBoard() {

    let board = document.getElementById('board');

    document.getElementById('board').style.height = this.rows*this.size + 'px';
    document.getElementById('board').style.width = this.cols*this.size + 'px';

    for (let r=0; r<this.rows; r++) {
      this.cells.push([]);

      for (let c=0; c<this.cols; c++) {
        this.cells[r].push({
          symbol: ' ',
          hasmoved: false,
          isactive: false,
          dir: null
        });
        let cell = document.createElement('div');
        cell.className = 'cell';
        let tile1 = document.createElement('div');
        tile1.className = 'tile1';
        let tile2 = document.createElement('div');
        tile2.className = 'tile2';
        cell.appendChild(tile1);
        cell.appendChild(tile2);
        board.appendChild(cell);
      }
    }

    let rowsfr = '1fr '.repeat(this.rows);
    let colsfr = '1fr '.repeat(this.cols);

    board.style.gridTemplateRows = rowsfr;
    board.style.gridTemplateColumns = colsfr;
  }

  /**
   * Apply a given function to all of the cells in the cells array.
   *
   * @param {function} func The function to apply.
   */
  applyCells(func) {

    for (let r=0; r<this.rows; r++) {

      for (let c=0; c<this.cols; c++) {
          func(r,c);
      }
    }
  }

  /**
   * Add a new (half) tile to the cells array.
   *
   * @param {number} r The row address.
   * @param {number} c The column address.
   * @param {Tile} r A tile object.
   */
  addTile(r, c, tile) {
    this.cells[r][c].symbol = tile;

    for (let [key, value] of Object.entries(this.cells[r][c].symbol.tilepair)) {
      switch (value) {
        case '🢀':
          this.cells[r][c].isactive = true;
          this.cells[r][c].dir = 'W';
          break;
        case '🢂':
          this.cells[r][c].isactive = true;
          this.cells[r][c].dir = 'E';
          break;
        case '🢁':
          this.cells[r][c].isactive = true;
          this.cells[r][c].dir = 'N';
          break;
        case '🢃':
          this.cells[r][c].isactive = true;
          this.cells[r][c].dir = 'S';
          break;
      }
    }

    this.drawBoard();
  }

  /**
   * Draw (or redraw) the board.
   */
  drawBoard() {

    this.applyCells((r,c) => {
      let cell = document.querySelectorAll('#board .cell')[(r*this.cols)+c];

      if (typeof this.cells[r][c].symbol.tilepair !== 'undefined') {
        cell.querySelectorAll('.tile1')[0].innerHTML = this.cells[r][c].symbol.tilepair[0];
        cell.querySelectorAll('.tile2')[0].innerHTML = this.cells[r][c].symbol.tilepair[1];
      }

      if (this.cells[r][c].isactive) {
        cell.style.backgroundColor = 'red';
      }
      else {
        cell.style.backgroundColor = 'transparent';
      }
    });

  }

  /**
   * Reset the hasmoved attribute of the all cells in the cells array
   */
  resetMoved() {

    this.applyCells((r,c) => {
      this.cells[r][c].hasmoved = false;
    });
  }

  /**
   * Advance the state of all the cells in the cell array a single 'step'.
   */
  updateBoard() {

    this.applyCells((r,c) => {

      // the rules of the tiles/pieces
      // CLEAN THESE RULES UP AS THERE IS A LOT OF EARLY AND NO-LONGER-RELEVANT CODE HERE

      if (!this.cells[r][c].hasmoved && this.cells[r][c].isactive) {

        if (this.cells[r][c].dir == 'W') {
          switch (this.cells[r][c].symbol) {
            case '└':
              this.cells[r][c].dir = 'N';
              break;
            case '┌':
              this.cells[r][c].dir = 'S';
              break;
          }
        }
        else if (this.cells[r][c].dir == 'E') {
          switch (this.cells[r][c].symbol) {
            case '┐':
              this.cells[r][c].dir = 'S';
              break;
            case '┘':
              this.cells[r][c].dir = 'N';
              break;
          }
        }
        else if (this.cells[r][c].dir == 'N') {
          switch (this.cells[r][c].symbol) {
            case '┐':
              this.cells[r][c].dir = 'W';
              break;
            case '┌':
              this.cells[r][c].dir = 'E';
              break;
          }
        }
        else if (this.cells[r][c].dir == 'S') {
          switch (this.cells[r][c].symbol) {
            case '└':
              this.cells[r][c].dir = 'E';
              break;
            case '┘':
              this.cells[r][c].dir = 'W';
              break;
          }
        }

        switch (this.cells[r][c].dir) {
          case 'W':
            this.cells[r][c-1].isactive = true;
            this.cells[r][c-1].isactive = true;
            this.cells[r][c-1].dir = 'W';
            break;
          case 'E':
            this.cells[r][c+1].isactive = true;
            this.cells[r][c+1].hasmoved = true;
            this.cells[r][c+1].dir = 'E';
            break;
          case 'N':
            this.cells[r-1][c].isactive = true;
            this.cells[r-1][c].hasmoved = true;
            this.cells[r-1][c].dir = 'N';
            break;
          case 'S':
            this.cells[r+1][c].isactive = true;
            this.cells[r+1][c].hasmoved = true;
            this.cells[r+1][c].dir = 'S';
            break;
        }

        this.cells[r][c].isactive = false;
        this.cells[r][c].dir = null;
      }
      this.cells[r][c].hasmoved = true;

    });

    this.drawBoard();
    this.resetMoved();
  }
}
