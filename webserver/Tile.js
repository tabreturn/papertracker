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
    this.tileaudio = ['null, null'];

    [tile1, tile2].forEach(function(v, i) {
      let id = v + Date.now();

      switch (v) {
        // directions
        case 'N': this.tileicons[i] = '<i class="fas fa-arrow-up"></i>'; break;
        case 'S': this.tileicons[i] = '<i class="fas fa-arrow-down"></i>'; break;
        case 'W': this.tileicons[i] = '<i class="fas fa-arrow-left"></i>'; break;
        case 'E': this.tileicons[i] = '<i class="fas fa-arrow-right"></i>'; break;
        // colors
        case 'CC': this.tileicons[i] = '#00FFFF'; break;
        case 'CM': this.tileicons[i] = '#FF00FF'; break;
        case 'CY': this.tileicons[i] = '#FFFF00'; break;
        case 'C4': this.tileicons[i] = '#FFFF00'; break;
        case 'C5': this.tileicons[i] = '#00FFFF'; break;
        case 'C6': this.tileicons[i] = '#FF00FF'; break;
        // audio
        case 'AH':
          this.tileicons[i] = '<img src="samples/hi-hat-svgrepo-com.svg">';
          this.tileaudio[i] = ['sample', id];
          this.preloadSample('samples/hihat.mp3', id)
          break;
        case 'AS1':
          this.tileicons[i] = '<img src="samples/keyboard-music-and-multimedia-svgrepo-com.svg">';
          this.tileaudio[i] = ['sample', id];
          this.preloadSample('samples/stab1.mp3', id)
          break;
        case 'AS2':
          this.tileicons[i] = '<img src="samples/keyboard-music-and-multimedia-svgrepo-com.svg">';
          this.tileaudio[i] = ['sample', id];
          this.preloadSample('samples/stab2.mp3', id)
          break;
        case 'AK1':
          this.tileicons[i] = '<img src="samples/bass-drum-svgrepo-com.svg">';
          this.tileaudio[i] = ['sample', id];
          this.preloadSample('samples/kick1.mp3', id)
          break;
        case 'AK2':
          this.tileicons[i] = '<img src="samples/bass-drum-svgrepo-com.svg">';
          this.tileaudio[i] = ['sample', id];
          this.preloadSample('samples/kick2.mp3', id)
          break;
        case 'A6':
          this.tileicons[i] = '🎹';
          this.tileaudio[i] = ['tone', 'A6', '8n'];
          break;
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
    let audio = document.createElement('audio');
    let source = document.createElement('source');
    source.src = sample;
    audio.appendChild(source);
    audio.id = id;
    audio.setAttribute('preload', 'auto');
    document.body.appendChild(audio);
  }
}
