/**
 * Aruco module for detecting markers in images.
 * @module Aruco
 */

export class Aruco {
  /**
   * Detect aruco codes using the webcam.
   * @param {string} canvasid The id for the canvas that displays the video.
   */
  constructor(canvasid) {
    let video = document.createElement('video');
    video.setAttribute('autoplay', 'true');
    video.setAttribute('id', 'video');
    video.style.display = 'none';
    document.body.appendChild(video);
    video = document.getElementById('video');
    this.canvas = document.getElementById(canvasid);
    this.context = canvas.getContext('2d');
    this.tiles = [];
    // access the webcam
    const constraints = {
       audio: false,
       video: {
         facingMode: { exact: 'environment' },
         width: { min: 1280 },
         height: { min: 720 }
       }
    }
    navigator.mediaDevices.getUserMedia(constraints).
      then((stream) => { video.srcObject = stream }).
      catch(() => {
        navigator.mediaDevices.getUserMedia({ video:true }).
          then((stream) => { video.srcObject = stream }).
          catch((error) => { console.log(error) });
      });

    requestAnimationFrame(() => { this.tick() });
  }

  /**
   * Detect the aruco markers and draw them to the canvas. Run repeatedly for video.
   */
  tick() {
    requestAnimationFrame(() => { this.tick() });

    let detector = new AR.Detector();
    // use testimg over video if the element exists
    if (document.getElementById('testimg')) {
      let testimg = document.getElementById('testimg');
      this.context.drawImage(testimg, 0, 0, testimg.width, testimg.height);
      let markers = detector.detect(this.context.getImageData(0, 0, testimg.width, testimg.height));
      this.drawCorners(markers);
      this.drawId(markers);
    }
    // else use camera/webcam feed
    else if (video.readyState === video.HAVE_ENOUGH_DATA) {
      // draw the frame first
      let cw = canvas.width;
      let ch = canvas.height;
      this.context.drawImage(video, 0, 0, cw, ch);
      // then the markers
      let markers = detector.detect(this.context.getImageData(0, 0, cw, ch));
      this.drawCorners(markers);
      this.drawId(markers);
    }
  }

  /**
   * Outline each marker identified.
   *
   * @param {array} markers Array containing the marker id and coordinate data.
   */
  drawCorners(markers) {
    let corners, corner, i, j;

    this.context.lineWidth = 3;

    for (let i=0; i!==markers.length; ++i) {
      corners = markers[i].corners;
      this.context.strokeStyle = '#F00';
      this.context.beginPath();

      for (let j=0; j!==corners.length; ++j) {
        corner = corners[j];
        this.context.moveTo(corner.x, corner.y);
        corner = corners[(j + 1) % corners.length];
        this.context.lineTo(corner.x, corner.y);
      }

      this.context.stroke();
      this.context.closePath();
      this.context.strokeStyle = '#0F0';
      this.context.strokeRect(corners[0].x-2, corners[0].y-2, 4, 4);
    }
  }

  /**
   * Number each marker identified.
   *
   * @param {array} markers Array containing the marker id and coordinate data.
   */
  drawId(markers){
    let corners, corner, x, y, i, j;

    this.context.strokeStyle = "blue";
    this.context.lineWidth = 1;

    for (let i=0; i!==markers.length; ++i) {
      corners = markers[i].corners;
      x = Infinity;
      y = Infinity;

      for (let j=0; j!==corners.length; ++j) {
        corner = corners[j];
        x = Math.min(x, corner.x);
        y = Math.min(y, corner.y);
      }

      this.context.strokeText(markers[i].id, x, y);
      this.tiles.push(markers[i].id);
      // remove duplicate values in tile array
      this.tiles = Array.from(new Set(this.tiles));
    }
  }
}
