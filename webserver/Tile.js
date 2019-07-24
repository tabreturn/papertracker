/**
 * Tile module that hold two half-tiles (the most each cell can hold).
 * @module Tile
 */

export class Tile {
  /**
   * Create a new half-tile piece. A game will comprise multiple such tiles.
   * @param {string} tile1 Optional first tile.
     @param {string} tile2 Optional second tile.
     @param {string} orientation='v' An h or v for horizontal or vertical (does nothing yet).
   */
  constructor(tile1, tile2, orientation='v') {

    this.orientation = orientation;
    this.tilepair = [tile1, tile2];
    this.tileicons = [tile1, tile2];

    [tile1, tile2].forEach(function(v, i) {
      switch (v) {
        // directions
        case 'N': this.tileicons[i] = '<i class="fas fa-arrow-alt-circle-up"></i>'; break;
        case 'S': this.tileicons[i] = '<i class="fas fa-arrow-alt-circle-down"></i>'; break;
        case 'W': this.tileicons[i] = '<i class="fas fa-arrow-alt-circle-left"></i>'; break;
        case 'E': this.tileicons[i] = '<i class="fas fa-arrow-alt-circle-right"></i>'; break;
        // colors
        case 'C1': this.tileicons[i] = '#FF0000'; break;
        case 'C2': this.tileicons[i] = '#00FF00'; break;
        case 'C3': this.tileicons[i] = '#0000FF'; break;
        case 'C4': this.tileicons[i] = '#FFFF00'; break;
        case 'C5': this.tileicons[i] = '#00FFFF'; break;
        case 'C6': this.tileicons[i] = '#FF00FF'; break;
        // audio
        case 'A1': this.tileicons[i] = '🎹'; break;
        case 'A2': this.tileicons[i] = '🎻'; break;
        case 'A3': this.tileicons[i] = '🎷'; break;
        case 'A4': this.tileicons[i] = '🎺'; break;
        case 'A5': this.tileicons[i] = '<i class="fas fa-guitar"></i>'; break;
        case 'A6': this.tileicons[i] = '<i class="fas fa-drum"></i>'; break;
      }
    }, this);

  }
}
