from cv.DetectTiles import DetectTiles
from flask import Flask, jsonify, render_template, request
import base64
import cv2
import cv2.aruco as aruco
import numpy as np

app = Flask(__name__)
app.config.from_pyfile('config.py') # create this file on the server

# routes

@app.route('/')
def papertracker():
    '''
    Landing page route.
    '''
    return render_template('papertracker.html')

@app.route('/snap', methods=['PUT'])
def snap():
    '''
    Photo sumbmission endpoint.
    '''
    # convert base64 string to binary image
    b64string = request.values['imageBase64'].split(',')[1]
    b64image = np.fromstring(base64.b64decode(b64string), np.uint8)

    # save image
    sessionid = request.values['sessionid']
    count = request.values['count']
    filename = ('{}/{}-{}.png').format(app.config['UPLOADS'], sessionid, count)
    snap = cv2.imdecode(b64image, cv2.IMREAD_COLOR)
    cv2.imwrite(filename, snap)

    # detect tiles after x-many photos snapped
    if int(count) == 2:
        coords = DetectTiles(sessionid+'-2', app.config['UPLOADS'])
        coords = DetectTiles('test', app.config['MARKERTEST']) # uncomment for test image
        result = coords.arucoDetect()
        print(result)
        return jsonify(transformCVforJSON(result))

    return jsonify('another snap required')

# utilities

def transformCVforJSON(cvlist):
    '''
    Transform the CV data to front-end compatible JSON:
    [col, row, ['tile1', 'tile2']]
    '''
    tilelist = []

    for i in range(len(cvlist['columns'])):
        found = False

        for tl in tilelist:
            # search for an existing duplicate
            if tl[0]==cvlist['columns'][i] and tl[1]==cvlist['rows'][i]:
                # if found, define the second tile
                tl[2][1] = cvlist['labels'][i]
                found = True

        # append cell in new format if no duplicate
        if not found:
            cell = [
              cvlist['columns'][i],
              cvlist['rows'][i],
              [cvlist['labels'][i], ' ']
            ]
            tilelist.append(cell)

    return tilelist

def aggregateCoords(coordlists):
    '''
    Combine tile detection data from multiple snaps.
    '''
    tiles = []

    for tilelist in coordlists:
        jsonlist = transformCVforJSON(tilelist)
        # UNFINISHED ..........................
        # .....................................
