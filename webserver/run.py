from flask import Flask, render_template, request
import base64
import cv2
import cv2.aruco as aruco
import numpy as np

app = Flask(__name__)
app.config['UPLOADS'] = 'static/tmp'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/snap', methods=['PUT'])
def snap():
    # convert base64 string to binary image
    b64string = request.values['imageBase64'].split(',')[1]
    b64image = np.fromstring(base64.b64decode(b64string), np.uint8)
    # detect markers
    snap = cv2.imdecode(b64image, cv2.IMREAD_COLOR)
    arucodict = aruco.Dictionary_get(aruco.DICT_ARUCO_ORIGINAL)
    params = aruco.DetectorParameters_create()
    corners, ids, rejectedpoints = aruco.detectMarkers(snap, arucodict, parameters=params)
    aruco.drawDetectedMarkers(snap, corners, ids)
    aruco.drawDetectedMarkers(snap, rejectedpoints, borderColor=(100, 0, 240))
    # save result
    cv2.imwrite(app.config['UPLOADS']+'/result.jpg', snap);
    return 'done'

if __name__ == '__main__':
    app.run()
