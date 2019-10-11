import {Aruco} from './Aruco.js';
import {Tile}  from './Tile.js';
import {Board} from './Board.js';

const detect = new Aruco('canvas');
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

// start button
document.getElementById('start').addEventListener('click', (e) => {
  window.setInterval(() => game.updateBoard(), 1000/game.speed);
  e.srcElement.classList.add('active');
});
// step button
document.getElementById('step').addEventListener('click', () => {
  game.updateBoard();
  //console.log(game);
});
// reload button
document.getElementById('reload').addEventListener('click', () => {
  location.reload();
});
// snap button
document.getElementById('snap').addEventListener('click', () => {
  const file = document.getElementById('photo');
  const data = new FormData();
  data.append('image', file.files[0]);
  
  fetch('/snap', {
    method: 'PUT',
    body: data
  })
  .then( response => console.log(response) )
  .catch( error => console.log(error) );

  /*detect.tiles.forEach((tile) => {
    game.addTile(0, 0, new Tile(11, 'CC'));
  });*/
});

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
