/**
 * Tile module for a single tile comprised of two half-tiles (which may be empty).
 * For Tone.js, uncomment the relevant line in templates/jslibs.html.
 * For fontawesome, uncomment the relevant line in templates/jslibs.html.
 * @module Tile
 */

export class Tile {
  /**
   * Create a new half-tile piece. A game will comprise multiple such tiles.
   * @param {string} tile1 Optional first tile.
   * @param {string} tile2 Optional second tile.
   * @param {string} orientation='v' An h or v for horizontal or vertical (does nothing yet).
   */
  constructor(tile1, tile2, orientation='v') {
    this.orientation = orientation;
    this.tilepair = [tile1, tile2];
    this.tileicons = [tile1, tile2]; // these values are overwritten in the foreach below
    this.tileaudio = ['null, null'];

    [tile1, tile2].forEach(function(v, i) {
      const id = v + Date.now();

      switch (v) {
        // directions
        case 'N': this.tilepair[i] = 'N'; this.tileicons[i] = '↑'; break; // for font-awesome use <i class="fas fa-arrow-down"></i>
        case 'S': this.tilepair[i] = 'S'; this.tileicons[i] = '↓'; break;
        case 'W': this.tilepair[i] = 'W'; this.tileicons[i] = '←'; break;
        case 'E': this.tilepair[i] = 'E'; this.tileicons[i] = '→'; break;
        // colors
        case 'red':     this.tileicons[i] = '#FF0000'; break;
        case 'magenta': this.tileicons[i] = '#FF00FF'; break;
        case 'yellow':  this.tileicons[i] = '#FFFF00'; break;
        case 'green':   this.tileicons[i] = '#00FF00'; break;
        // audio
        // audio tiles must begin with an A_
        case 'A_hat':
          this.tileicons[i] = 'ѻ'; // for an image use '<img src="static/samples/hi-hat-svgrepo-com.svg">';
          this.tileaudio[i] = ['sample', id];
          this.preloadSample('static/samples/hihat.mp3', id)
          break;
        case 'A_stab1':
          this.tileicons[i] = 'k';
          this.tileaudio[i] = ['sample', id];
          this.preloadSample('static/samples/stab1.mp3', id)
          break;
        case 'A_stab2':
          this.tileicons[i] = 'K';
          this.tileaudio[i] = ['sample', id];
          this.preloadSample('static/samples/stab2.mp3', id)
          break;
        case 'A_kick1':
          this.tileicons[i] = 'Ô';
          this.tileaudio[i] = ['sample', id];
          this.preloadSample('static/samples/kick1.mp3', id)
          break;
        case 'A_kick2':
          this.tileicons[i] = 'Ö';
          this.tileaudio[i] = ['sample', id];
          this.preloadSample('static/samples/kick2.mp3', id)
          break;
        /* tone example -- requires Tone.js library
        case 'A6':
          this.tileicons[i] = '🎹';
          this.tileaudio[i] = ['tone', 'A6', '8n'];
          break;
        */
      }
    }, this);
  }

  /**
   * Preload an audio sample by adding it as an <audio> element.
   *
   * @param {string} sample The audio file path.
   * @param {string} id The audio element id.
   */
  preloadSample(sample, id) {
    const audio = document.createElement('audio');
    const source = document.createElement('source');
    source.src = sample;
    audio.appendChild(source);
    audio.id = id;
    audio.setAttribute('preload', 'auto');
    document.body.appendChild(audio);
  }
}
