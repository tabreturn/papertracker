from flask import Flask, render_template, request
import os
import cv2
import cv2.aruco as aruco

app = Flask(__name__)
app.config['UPLOADS'] = 'static/tmp'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/snap', methods=['PUT'])
def snap():
    file = request.files['image']
    file.save(os.path.join(app.config['UPLOADS'], 'snap.jpg'))
    photo = cv2.imread(app.config['UPLOADS']+'/snap.jpg')
    arucodict = aruco.Dictionary_get(aruco.DICT_ARUCO_ORIGINAL)
    params = aruco.DetectorParameters_create()
    corners, ids, rejectedpoints = aruco.detectMarkers(photo, arucodict, parameters=params)
    aruco.drawDetectedMarkers(photo, corners, ids)
    aruco.drawDetectedMarkers(photo, rejectedpoints, borderColor=(100, 0, 240))
    cv2.imwrite(app.config['UPLOADS']+'/result.jpg', photo);
    return 'done'

if __name__ == '__main__':
    app.run()
