import {TilePair}  from './TilePair.js';
import {Board} from './Board.js';

const refresh = 5; // in seconds, the time between each request for new board data
const fr_board = document.getElementById('board');

function spawnBoard() {
  const papertracker = new Board('board', 6, 10, 5); // Board(rows, cols, speed)
  window.papertracker = papertracker;
  papertracker.setupBoard();
}

let interval;

function runBoard() {
  interval = setInterval(() => papertracker.updateBoard(), 1000/papertracker.speed);
}

// fetch latest snap data every 5 seconds

setInterval(() => fetchLatestSnap(), refresh*1000);
let simulationid;

function fetchLatestSnap() {

  fetch('/latestsnap', { method: 'POST' })
    .then((response) => {

      if (response.ok) {
        return response.json();
      } else {
        throw new Error('json error');
      }
  })
  .then((json) => {
    // check if there is new board data
    if (json === 0) {
      console.log('no changes');
    }
    else if (json[0] !== simulationid) {
      console.log('set/reset board');
      simulationid = json[0];
      // remove all of the board cells and clear the stepping
      [].forEach.call(fr_board.querySelectorAll('.cell'), function(e) {
        e.parentNode.removeChild(e);
      });
      clearInterval(interval);
      // setup new layout
      spawnBoard();
      json[1].forEach((tile) => {
        papertracker.addTilePair(tile[0], tile[1], new TilePair(tile[2][0], tile[2][1]));
      });

      runBoard();
    }
  })
  .catch((error) => {
    console.log(error);
  });
}
