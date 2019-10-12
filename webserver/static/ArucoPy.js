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
      then((stream) => { video.srcObject = stream; video.play() }).
      catch(() => {
        navigator.mediaDevices.getUserMedia({ video:true }).
          then((stream) => { video.srcObject = stream }).
          catch((error) => { alert(error) });
      });

    //requestAnimationFrame(() => { this.tick() });
  }

  /**
   * ....
   * @param {string} ... ....
   * @param {string} ... ....
   */
  snap() {
    let photocanvas = document.createElement('canvas');
    photocanvas.setAttribute('id', 'photocanvas');
    photocanvas.setAttribute('width', this.video.videoWidth);
    photocanvas.setAttribute('height', this.video.videoHeight);
    photocanvas.style.display = 'none';
    document.body.appendChild(photocanvas);
    photocanvas = document.getElementById('photocanvas');
    const context = photocanvas.getContext('2d');
    context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);

    /*
    const file = document.getElementById('photo');
    const data = new FormData();
    data.append('image', file.files[0]);

    fetch('/snap', {
      method: 'PUT',
      body: data
    })
    .then( response => console.log(response) )
    .catch( error => console.log(error) );
    */
  }
}
