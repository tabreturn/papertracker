import {ArucoPy} from './ArucoPy.js'; // for js, use ArucoJS
import {Tile}  from './Tile.js';
import {Board} from './Board.js';

const detect = new ArucoPy('video', '/snap');
const devmode = 1;

if (devmode) {
  var game = new Board(6, 12, 5); // Board(rows, cols, speed)
  window.game = game;
  window.Tile = Tile;
}
else {
  var game = new Board();
}

game.setupBoard();

// photo buttons

const snap0 = document.getElementById('snap0');
const snap1 = document.getElementById('snap1');
const snap2 = document.getElementById('snap2');

snap0.addEventListener('click', () => {
  const doc = window.document;
  const docel = doc.documentElement;
  const requestFullScreen = doc.documentElement.requestFullscreen;
  const cancelFullScreen = doc.exitFullscreen;
  !doc.fullscreenElement ? requestFullScreen.call(docel) : cancelFullScreen.call(doc);
  e.target.classList.add('hide');
  snap2.classList.remove('hide');
});

if (window.screen.width > 600) {
  document.getElementById('snap0').classList.add('hide');
  snap1.classList.remove('hide');
}

snap1.addEventListener('click', (e) => {
  detect.snap();
  e.target.classList.add('hide');
  snap2.classList.remove('hide');
});

snap2.addEventListener('click', (e) => {
  detect.snap();
  e.target.style.display = 'none';
  document.getElementById('snap').classList.add('hide');
  document.getElementById('board').classList.remove('hide');
});

// board buttons

document.getElementById('start').addEventListener('click', (e) => {
  window.setInterval(() => game.updateBoard(), 1000/game.speed);
  e.srcElement.classList.add('active');
});

document.getElementById('step').addEventListener('click', () => {
  game.updateBoard();
  //console.log(game);
});

document.getElementById('reload').addEventListener('click', () => {
  location.reload();
});


/*detect.tiles.forEach((tile) => {
  game.addTile(0, 0, new Tile(11, 'CC'));
});*/




// add some test tiles
game.addTile(0, 0, new Tile('S', 'CC'));
game.addTile(0, 4, new Tile('AS1', 'E', 'h')); // h arg is for optional orientation (yet to implement)
game.addTile(4, 4, new Tile('AH', ' '));
game.addTile(5, 4, new Tile('AK1', ' '));
game.addTile(8, 4, new Tile('N', ' '));
game.addTile(8, 0, new Tile('W', ' '));
// magenta pulse
game.addTile(5, 2, new Tile('E', 'CM'));
game.addTile(8, 2, new Tile('AK2', ' '));
game.addTile(9, 2, new Tile('AK2', 'W'));
// yellow pulses
game.addTile(10, 0, new Tile('S', 'CY'));
game.addTile(11, 5, new Tile('W', 'CY'));
