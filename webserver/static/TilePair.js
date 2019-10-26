/**
 * TilePair module for a single cell comprised of zero, one, or two half-tiles.
 * For fontawesome, uncomment the relevant line in templates/jslibs.html.
 * @module TilePair
 */

// configuration file for half-tiles
import config from './config.js';

export class TilePair {
  /**
   * Create a new half-tile pair. A game will comprise multiple such tile pairs.
   * @param {string} tile1 Optional first tile.
   * @param {string} tile2 Optional second tile.
   * @param {string} orientation='v' An h or v for horizontal or vertical (does nothing yet).
   */
  constructor(tile1, tile2, orientation='v') {
    this.orientation = orientation;  // e.g. 'v'
    this.tileinstr = [tile1, tile2]; // e.g. ['green', 'S']
    this.tileicons = [tile1, tile2]; // e.g. ['#00FF00', '↓']
    this.tileaudio = [' ', ' '];     // e.g. [['synth...'], ' ']

    [tile1, tile2].forEach(function(v, i) {

      Object.keys(config.arrows).forEach((key) => {
        // directions
        if (v === key) {
          this.tileinstr[i] = v;
          this.tileicons[i] = config.arrows[key];
        }
      });

      Object.keys(config.colors).forEach((key) => {
        // colors
        if (v === key) {
          this.tileicons[i] = config.colors[key][1];
        }
      });

      Object.keys(config.instruments).forEach((key) => {
        // instruments
        if (v === key) {
          this.tileicons[i] = config.instruments[key][1];
          this.tileaudio[i] = config.instruments[key][2];
        }
      });
    }, this);
  }
}
