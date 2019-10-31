import {TilePair}  from './TilePair.js';
import {Board} from './Board.js';

const video = document.getElementById('video');
const resturl = '/snap';

function spawnBoard() {
  const papertracker = new Board('board', 6, 10, 5); // Board(rows, cols, speed)
  window.papertracker = papertracker;
  papertracker.initBoard();
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

// snap/re-snap step buttons

const bt_snapfirst = document.getElementById('snapfirst');
const bt_snapagain = document.getElementById('snapagain');

[bt_snapfirst, bt_snapagain].forEach((elem) => {
  elem.addEventListener('click', () => {
    const imagedata = snap(1);
    video.style.visibility = 'hidden';
    bt_snapfirst.classList.add('hide');
    bt_snapagain.classList.add('hide');

    fetch('/snap', { method: 'PUT', body: imagedata })
      .then((response) => {

        if (response.ok) {
          return response.json();
        } else {
          video.style.visibility = 'visible';
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
        papertracker.addTilePair(tile[0], tile[1], new TilePair(tile[2][0], tile[2][1]));
      });
    })
    .catch((error) => {
      console.log(error);
    });
  });
});

// board step buttons

let interval;
const boardui = document.querySelector('#board .ui');
const bt_run = document.getElementById('run');
const bt_labelreset = '* reset';
const bt_labelrun = '|&gt; run';

bt_run.addEventListener('click', runButton);
bt_run.innerHTML = bt_labelrun;

function runButton(e) {
  e.stopPropagation();
  // switch between run and rerun states
  if (e.target.innerHTML === bt_labelrun) {
    e.target.innerHTML = bt_labelreset;
    boardui.classList.add('hide');
    interval = setInterval(() => papertracker.updateBoard(), 1000/papertracker.speed);
  }
  else if (e.target.innerHTML === bt_labelreset) {
    e.target.innerHTML = bt_labelrun;
    boardui.classList.remove('hide');
    clearInterval(interval);
    papertracker.resetBoard();
  }
}

fr_board.addEventListener('click', () => {
  boardui.classList.remove('hide');
  clearInterval(interval);
});

document.getElementById('step').addEventListener('click', () => {
  papertracker.updateBoard();
});

document.getElementById('resnap').addEventListener('click', () => {
  bt_run.innerHTML = bt_labelrun;
  bt_snapfirst.classList.remove('hide');
  fr_board.classList.add('hide');
  fr_snap.classList.remove('hide');
  video.style.visibility = 'visible';
  clearInterval(interval);
  // remove all of the board cells
  [].forEach.call(fr_board.querySelectorAll('.cell'), function(e) {
    e.parentNode.removeChild(e);
  });
});
