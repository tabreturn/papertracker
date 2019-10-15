import {ArucoPy} from './ArucoPy.js';
import {Tile}  from './Tile.js';
import {Board} from './Board.js';

const detect = new ArucoPy('video', '/snap');
const devmode = 1;

function spawnBoard() {

  if (devmode) {
    var game = new Board('board', 6, 12, 5); // Board(rows, cols, speed)
    window.game = game;
    window.Tile = Tile;
  }
  else {
    var game = new Board();
  }
  game.setupBoard();
}

// frames

const fr_instructions = document.getElementById('instructions');
const fr_snap = document.getElementById('snap');
const fr_board = document.getElementById('board');

// instruction buttons

const bt_fullscreen = document.getElementById('fullscreen');
const bt_letsgo = document.getElementById('letsgo');

bt_fullscreen.addEventListener('click', () => {
  bt_fullscreen.classList.add('hide');
  bt_letsgo.classList.remove('hide');
  document.documentElement.requestFullscreen();
});

if (window.screen.width > 950 || window.fullScreen) {
  bt_fullscreen.classList.add('hide');
  bt_letsgo.classList.remove('hide');
}

bt_letsgo.addEventListener('click', () => {
  fr_instructions.classList.add('hide');
  fr_snap.classList.remove('hide');
});

// photo buttons

const bt_snap1 = document.getElementById('snap1');
const bt_snap2 = document.getElementById('snap2');

bt_snap1.addEventListener('click', () => {
  detect.snap(1);
  bt_snap1.classList.add('hide');
  bt_snap2.classList.remove('hide');
});

bt_snap2.addEventListener('click', () => {
  detect.snap(2);
  fr_snap.classList.add('hide');
  fr_board.classList.remove('hide');

  spawnBoard();
  // sample tiles
  game.addTile(0, 0, new Tile('S', 'CC'));
  game.addTile(0, 4, new Tile('AS1', 'E', 'h'));
  game.addTile(4, 4, new Tile('AH', ' '));
  game.addTile(5, 4, new Tile('AK1', ' '));
  game.addTile(8, 4, new Tile('N', ' '));
  game.addTile(8, 0, new Tile('W', ' '));
  game.addTile(5, 2, new Tile('E', 'CM'));
  game.addTile(8, 2, new Tile('AK2', ' '));
  game.addTile(9, 2, new Tile('AK2', 'W'));
  game.addTile(10, 0, new Tile('S', 'CY'));
  game.addTile(11, 5, new Tile('W', 'CY'));
});

// board buttons

var interval;
const boardui = document.querySelector('#board .ui');

document.getElementById('start').addEventListener('click', () => {
  event.stopPropagation();
  interval = setInterval(() => game.updateBoard(), 1000/game.speed);
  boardui.classList.add('hide');
});

fr_board.addEventListener('click', () => {
  clearInterval(interval);
  boardui.classList.remove('hide');
});

document.getElementById('step').addEventListener('click', () => {
  game.updateBoard();
});

document.getElementById('resnap').addEventListener('click', () => {
  clearInterval(interval);
  fr_board.classList.add('hide');
  fr_snap.classList.remove('hide');
  bt_snap1.classList.remove('hide');
  bt_snap2.classList.add('hide');
  // remove all of the board cells
  [].forEach.call(fr_board.querySelectorAll('.cell'), function(e) {
    e.parentNode.removeChild(e);
  });
});
