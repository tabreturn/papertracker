import {Tile}  from './Tile.js';
import {Board} from './Board.js';

const video = document.getElementById('video');
const resturl = '/snap';
const devmode = 1;
const sessionid = Date.now();

function spawnBoard() {

  if (devmode) {
    var game = new Board('board', 5, 11, 5); // Board(rows, cols, speed)
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

/* 2-SNAP MODE
const bt_snap1 = document.getElementById('snap1');

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
*/

const bt_snap2 = document.getElementById('snap2');
const bt_snapagain = document.getElementById('snapagain');

[bt_snap2, bt_snapagain].forEach((elem) => {
  elem.addEventListener('click', () => {
    let imagedata = snap(2);
    bt_snap2.classList.add('hide');
    bt_snapagain.classList.add('hide');

    fetch('/snap', { method: 'PUT', body: imagedata })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          bt_snapagain.classList.remove('hide');
          throw new Error('json error');
        }
    })
    .then((json) => {
      console.log(json)
      fr_snap.classList.add('hide');
      fr_board.classList.remove('hide');
      // populate board with empty cells
      spawnBoard();
      // add tiles to board
      json.forEach((tile) => {
        console.log(tile[0], tile[1], tile[2][0], tile[2][1]);
        game.addTile(tile[0], tile[1], new Tile(tile[2][0], tile[2][1]));
      });
    })
    .catch((error) => {
      console.log(error)
    });
  });
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
  /* 2-SNAP MODE
  bt_snap1.classList.remove('hide');
  bt_snap2.classList.add('hide');
  */
  bt_snap2.classList.remove('hide');
  // remove all of the board cells
  [].forEach.call(fr_board.querySelectorAll('.cell'), function(e) {
    e.parentNode.removeChild(e);
  });
  // remove all audio elements
  document.querySelectorAll('audio').forEach((elem) => {
    elem.parentNode.removeChild(elem);
  });
});
