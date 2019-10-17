import {Tile}  from './Tile.js';
import {Board} from './Board.js';

const video = document.getElementById('video');
const resturl = '/snap';
const devmode = 1;
const sessionid = Date.now();

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

function snap(count) {
  // add invisible canvas for photo data
  let photocanvas = document.createElement('canvas');
  photocanvas.setAttribute('id', 'photocanvas');
  photocanvas.setAttribute('width', video.videoWidth);
  photocanvas.setAttribute('height', video.videoHeight);
  photocanvas.style.display = 'none'; // comment out for debugging
  document.body.appendChild(photocanvas);
  photocanvas = document.getElementById('photocanvas');
  // draw photo to canvas
  const context = photocanvas.getContext('2d');
  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  photocanvas.parentNode.removeChild(photocanvas);
  // convert canvas to base64 image data
  const formdata = new FormData();
  formdata.append('sessionid', sessionid);
  formdata.append('imageBase64', photocanvas.toDataURL());
  formdata.append('count', count);
  return formdata;
}

// access the webcam

const constraints = {
   audio: false,
   video: {
     facingMode: { exact: 'environment' },
     width: { min: 1280 },
     height: { min: 720 }
   }
}
navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => { video.srcObject = stream; video.play() })
  .catch(() => {
    navigator.mediaDevices.getUserMedia({ video:true })
      .then((stream) => { video.srcObject = stream })
      .catch((error) => { alert(error) });
  });

// content frames for the instructions/snap/board steps

const fr_instructions = document.getElementById('instructions');
const fr_snap = document.getElementById('snap');
const fr_board = document.getElementById('board');

// instruction step buttons

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

// photo step buttons

const bt_snap1 = document.getElementById('snap1');
const bt_snap2 = document.getElementById('snap2');

bt_snap1.addEventListener('click', () => {
  let imagedata = snap(1);
  bt_snap1.classList.add('hide');

  fetch('/snap', { method: 'PUT', body: imagedata })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      bt_snap2.classList.remove('hide');
    })
});

bt_snap2.addEventListener('click', () => {
  let imagedata = snap(2);
  bt_snap2.classList.add('hide');

  fetch('/snap', { method: 'PUT', body: imagedata })
    .then(response => response.json())
    .then(json => {
      console.log(json)
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
    })
});

// board step buttons

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
