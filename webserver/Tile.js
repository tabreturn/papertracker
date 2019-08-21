/**
 * Tile module for a single tile comprised of two half-tiles (which may be empty).
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
    this.tileicons = [tile1, tile2]; // these values are overwritten in the foreach below
    this.tileaudio = [null, null]; // these values are overwritten in the foreach below

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
        case 'A1':
          this.tileicons[i] = '<img src="samples/88550-hi-hat.svg">';
          this.tileaudio[i] = ['sample', 'samples/209873_3797507-lq.mp3'];
          break;
        case 'A2':
          this.tileicons[i] = '<i class="fas fa-drum"></i>';
          this.tileaudio[i] = ['sample', 'samples/232014_736471-lq.mp3'];
          break;
        case 'A3':
          this.tileicons[i] = '🎷';
          this.tileaudio[i] = ['tone', 'A3', '8n'];
          break;
        case 'A4':
          this.tileicons[i] = '🎺';
          this.tileaudio[i] = ['tone', 'A4', '8n'];
          break;
        case 'A5':
          this.tileicons[i] = '🎹';
          this.tileaudio[i] = ['tone', 'A5', '8n'];
          break;
        case 'A6':
          this.tileicons[i] = '🎹';
          this.tileaudio[i] = ['tone', 'A6', '8n'];
          break;
      }
    }, this);

  }
}
