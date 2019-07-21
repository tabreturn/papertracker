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
    this.cells = [];  // this array contains only immovable items (tiles)
    this.pulses = []; // this array contains only movable items (pulses)
    this.size = size;
    this.rows = rows;
    this.cols = cols;
    this.speed = speed;
  }
  /**
   * Populate the cells and pulses arrays, and fill the board with visual cells.
   */
  setupBoard() {

    let board = document.getElementById('board');

    document.getElementById('board').style.height = this.rows*this.size + 'px';
    document.getElementById('board').style.width = this.cols*this.size + 'px';

    for (let r=0; r<this.rows; r++) {
      // populate cells and pulses arrays
      this.pulses.push([]);
      this.cells.push([]);

      for (let c=0; c<this.cols; c++) {

        this.pulses[r].push({
          color : 'transparent',
          dir: null,
          hasmoved: false
        });

        this.cells[r].push({
          tile: {}
        });
        // add empty cell divs (with two empty half-tiles each)
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
    // css grid magic (a 1fr for each row and column)
    board.style.gridTemplateRows = '1fr '.repeat(this.rows);
    board.style.gridTemplateColumns = '1fr '.repeat(this.cols);
  }

  /**
   * Apply a function to every item in the cells or pulses array.
   *
   * @param {function} func The function to apply.
   */
  loop2d(func) {

    for (let r=0; r<this.rows; r++) {

      for (let c=0; c<this.cols; c++) {
          func(r,c);
      }
    }
  }

  /**
   * Add a new half-tile to the cells an pulses arrays.
   *
   * @param {number} r The row address.
   * @param {number} c The column address.
   * @param {Tile} r A tile object.
   */
  addTile(r, c, tile) {
    // add tile to cells array
    this.cells[r][c].tile = tile;

    for (let [key, value] of Object.entries(this.cells[r][c].tile.tilepair)) {

      if (value.charAt(0) == '#') {
        // assign any color to pulses array
        this.pulses[r][c].color = value;
      }
      else {
        // assign any direction to pulses array
        switch (value) {
          case '🢀':
            this.pulses[r][c].isactive = true;
            this.pulses[r][c].dir = 'W';
            break;
          case '🢂':
            this.pulses[r][c].isactive = true;
            this.pulses[r][c].dir = 'E';
            break;
          case '🢁':
            this.pulses[r][c].isactive = true;
            this.pulses[r][c].dir = 'N';
            break;
          case '🢃':
            this.pulses[r][c].isactive = true;
            this.pulses[r][c].dir = 'S';
            break;
        }
      }
    }

    this.drawBoard();
  }

  /**
   * Draw (or redraw) the board.
   */
  drawBoard() {

    this.loop2d((r,c) => {
      let cell = document.querySelectorAll('#board .cell')[(r*this.cols)+c];
      let tilepair = this.cells[r][c].tile.tilepair;

      if (typeof tilepair !== 'undefined') {
        // draw symbol, or draw background color (if symbol begins with #)
        for (let i in tilepair) {
          let elem = '.tile'+(parseInt(i)+1);

          if (tilepair[i].charAt(0) == '#') {
            cell.querySelectorAll(elem)[0].style.backgroundColor = tilepair[i];
          }
          else {
            cell.querySelectorAll(elem)[0].innerHTML = tilepair[i];
          }
        }
      }
      // apply pulse color to appropriate cell
      cell.style.backgroundColor = this.pulses[r][c].color;
    });

  }

  /**
   * Advance the state of all the cells in the cell array a single 'step'.
   */
  updateBoard() {

    this.loop2d((r,c) => {
      // the rules of the tiles/pieces
      if (!this.pulses[r][c].hasmoved) {
        // direction rules
        switch (this.pulses[r][c].dir) {
          case 'W':
            this.pulses[r][c-1].hasmoved = true;
            this.pulses[r][c-1].dir = 'W';
            this.pulses[r][c-1].color = this.pulses[r][c].color;
            this.pulses[r][c].color = 'transparent';
            break;
          case 'E':
            this.pulses[r][c+1].hasmoved = true;
            this.pulses[r][c+1].dir = 'E';
            this.pulses[r][c+1].color = this.pulses[r][c].color;
            this.pulses[r][c].color = 'transparent';
            break;
          case 'N':
            this.pulses[r-1][c].hasmoved = true;
            this.pulses[r-1][c].dir = 'N';
            this.pulses[r-1][c].color = this.pulses[r][c].color;
            this.pulses[r][c].color = 'transparent';
            break;
          case 'S':
            this.pulses[r+1][c].hasmoved = true;
            this.pulses[r+1][c].dir = 'S';
            this.pulses[r+1][c].color = this.pulses[r][c].color;
            this.pulses[r][c].color = 'transparent';
            break;
        }

        this.pulses[r][c].dir = null;
      }
      this.pulses[r][c].hasmoved = false;

    });

    this.drawBoard();
  }
}
