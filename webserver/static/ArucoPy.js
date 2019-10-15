/**
 * Aruco module for detecting markers in images using Python back-end.
 * @module ArucoPy
 */

export class ArucoPy {
  /**
   * Photograph Aruco codes and send to REST API.
   * @param {string} videoid The id for the video element.
   * @param {string} resturl The REST endpoint.
   */
  constructor(videoid, resturl) {
    this.video = document.getElementById(videoid);
    this.resturl = resturl;
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
  }

  /**
   * Send canvas image data to a REST endpoint.
   * @param {string} photocanvas ID attribute for the canvas to submit as an image.
   * @param {string} resturl Endpoint to which the image is to be submitted.
   * @param {number} count For submitting multiple photos.
   * @param {string} method ['PUT'] HTTP request method.
   */
  submit(photocanvas, resturl, count, method='PUT') {
    const canvas = document.getElementById(photocanvas);
    const formdata = new FormData();
    formdata.append('imageBase64', canvas.toDataURL());
    formdata.append('count', count);

    fetch('/snap', {
      method: method,
      body: formdata
    })
      .then(response => response.json())
      .then(json => console.log(json))
  }

  /**
   * ... .
   * @param {...} ... ....
   */
  placeTiles() {
    //detect.tiles.forEach((tile) => {
    //  game.addTile(0, 0, new Tile(11, 'CC'));
    //});
  }

  /**
   * Take a photograph and submit it to the back-end.
   * @param {function} submitfunc [this.submit] Function for submitting to endpoint.
   * @param {number} count For submitting multiple photos.
   */
  snap(count, submitfunc=this.submit) {
    // add invisible canvas for photo data
    let photocanvas = document.createElement('canvas');
    photocanvas.setAttribute('id', 'photocanvas');
    photocanvas.setAttribute('width', this.video.videoWidth);
    photocanvas.setAttribute('height', this.video.videoHeight);
    photocanvas.style.display = 'none'; // comment out for debugging
    document.body.appendChild(photocanvas);
    photocanvas = document.getElementById('photocanvas');
    // draw photo to canvas
    const context = photocanvas.getContext('2d');
    context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
    submitfunc('photocanvas', this.resturl, count);
  }
}
