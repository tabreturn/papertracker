/**
 * Board module for drawing and controlling the board (and cells and pulses arrays).
 * For Tone.js, uncomment the relevant line in templates/jslibs.html.
 * For fontawesome, uncomment the relevant line in templates/jslibs.html.
 * @module Board
 */

export class Board {
  /**
   * Create a new board; ordinarily, just one board is required.
   * @param {string} id The id attribute for the board container element.
     @param {number} size=50 Width/height of each cell in pixels.
     @param {number} rows=9 Number of rows in the grid.
     @param {number} cols=12 Number of columns in the grid.
     @param {number} speed=5 Game speed.
   */
  constructor(id, rows=9, cols=12, speed=5) {
    // config variables
    this.cells = [];  // this array contains only immovable items (tiles)
    this.pulses = []; // this array contains only movable items (pulses)
    this.id = id;
    this.rows = rows;
    this.cols = cols;
    this.speed = speed;
    this.step = 0;
  }
  /**
   * Populate the cells and pulses arrays, and fill the board with visible cells.
   */
  setupBoard() {
    const board = document.getElementById(this.id);
    // css for scaling
    const aspectratio = this.rows / this.cols;
    board.style.width = '80vw';
    board.style.height = 80*aspectratio+'vw';
    board.style.maxWidth = '800px';
    board.style.maxHeight = 800*aspectratio+'px';

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
        // add empty cell divs (with two empty half-tile divs in each)
        const cell = document.createElement('div');
        cell.className = 'cell';
        const tile1 = document.createElement('div');
        tile1.className = 'tile1';
        const tile2 = document.createElement('div');
        tile2.className = 'tile2';
        cell.appendChild(tile1);
        cell.appendChild(tile2);
        board.appendChild(cell);
      }
    }
    // some css grid magic (a 1fr for each row and column)
    board.style.gridTemplateColumns = '1fr '.repeat(this.cols);
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
   * Add a new half-tile to the cells and pulses arrays.
   *
   * @param {number} r1 The row address beginning at 1.
   * @param {number} c1 The column address beginning at 1.
   * @param {Tile} tile A tile object.
   */
  addTile(c1, r1, tile) {
    // grid axes to begin at 1 and 1 (not zero)
    let c = c1-1;
    let r = r1-1;
    // add tile to cells array
    this.cells[r][c].tile = tile;

    const tileicons = this.cells[r][c].tile.tileicons;
    // add the starting position of any pulse to the pulses array
    for (let [key, value] of Object.entries(tileicons)) {
      // check for an arrow-color tile combo
      if (tileicons[0].charAt(0) === '#') {
        this.pulses[r][c].color = tileicons[0];
        this.pulses[r][c].dir = this.cells[r][c].tile.tilepair[1];
      }
      else if (tileicons[1].charAt(0)) {
        this.pulses[r][c].color = tileicons[1];
        this.pulses[r][c].dir = this.cells[r][c].tile.tilepair[0];
      }
    }

    this.drawBoard();
  }

  /**
   * Draw (or redraw) the board.
   */
  drawBoard() {

    this.loop2d((r,c) => {
      const cell = document.querySelectorAll('#board .cell')[(r*this.cols)+c];
      const tileicons = this.cells[r][c].tile.tileicons;

      if (typeof tileicons !== 'undefined') {
        // draw a symbol, or draw a background color if the symbol begins with #
        for (let i in tileicons) {
          const elem = '.tile'+(parseInt(i)+1);

          if (tileicons[i].charAt(0) !== '#' && this.step === 0) {
            cell.querySelectorAll(elem)[0].innerHTML = tileicons[i];
          }
        }
      }
      // apply pulse color to the appropriate cell
      cell.style.backgroundColor = this.pulses[r][c].color;
    });

  }

  /**
   * Checks and removes pulse that has overstepped the edge.
   *
   * @param {number} row Row index to test.
   * @param {number} col Col index to test.
     @return {boolean} If the pulse has overstepped boundary, then true
   */
  isOutOfBounds(row, col) {
    // remove overstepped tile
    if (row >= this.rows || row < 0 ||
        col >= this.cols || col < 0) {
      return true;
    }
    return false;
  }

  /**
   * Plays the tile audio associated in the tile definition.
   *
   * @param {array} tileaudio Tile audio array, containing type, and sample/tone info.
   */
  playTile(tileaudio) {
    // check if tileaudio is a sample or tone
    switch (tileaudio[0]) {
      case 'sample':
        const sample = document.getElementById(tileaudio[1])
        sample.currentTime = 0 // without this, js won't play same audio file in rapid succession (fix later)
        sample.play();
        break;
      case 'tone': // tone sounds require the Tone.js library
        const synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(tileaudio[1], tileaudio[2]);
        break;
    }
  }

  /**
   * Advance the state of all the cells in the cell array a single step.
   */
  updateBoard() {
    // move the pulse along its current heading
    this.loop2d((r,c) => {

      if (!this.pulses[r][c].hasmoved) {

        switch (this.pulses[r][c].dir) {
          case 'N':
            if ( this.isOutOfBounds(r-1,c) ) break;
            this.pulses[r-1][c].color = this.pulses[r][c].color;
            this.pulses[r-1][c].dir = 'N';
            this.pulses[r-1][c].hasmoved = true;
            break;
          case 'S':
            if ( this.isOutOfBounds(r+1,c) ) break;
            this.pulses[r+1][c].color = this.pulses[r][c].color;
            this.pulses[r+1][c].dir = 'S';
            this.pulses[r+1][c].hasmoved = true;
            break;
          case 'W':
            if ( this.isOutOfBounds(r,c-1) ) break;
            this.pulses[r][c-1].color = this.pulses[r][c].color;
            this.pulses[r][c-1].dir = 'W';
            this.pulses[r][c-1].hasmoved = true;
            break;
          case 'E':
            if ( this.isOutOfBounds(r,c+1) ) break;
            this.pulses[r][c+1].color = this.pulses[r][c].color;
            this.pulses[r][c+1].dir = 'E';
            this.pulses[r][c+1].hasmoved = true;
            break;
        }

        this.pulses[r][c].color = 'transparent';
        this.pulses[r][c].dir = null;
        this.pulses[r][c].hasmoved = true;
      }
    });
    // reset the hasmoved states for next updateBoard() call
    this.loop2d((r,c) => {
      this.pulses[r][c].hasmoved = false;
    });

    // the rules of the tiles/pieces are defined here
    this.loop2d((r,c) => {
      const tilepair = this.cells[r][c].tile.tilepair;
      const tileaudio = this.cells[r][c].tile.tileaudio;

      if (typeof tilepair !== 'undefined' && this.pulses[r][c].dir) {

        for (let i in tilepair) {
          // change pulse direction
          if (tilepair[i] === 'N' || tilepair[i] === 'S' ||
              tilepair[i] === 'W' || tilepair[i] === 'E') {
            this.pulses[r][c].dir = tilepair[i];
          }
          // play any instruments
          if (tilepair[i].substring(0, 2) === 'A_') {
            this.playTile(tileaudio[i]);
          }
        }
      }
    });

    this.step ++;
    this.drawBoard();
  }
}
