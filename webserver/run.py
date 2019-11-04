from cv.DetectTiles import DetectTiles
from flask import Flask, jsonify, render_template, request
import base64
import cv2
import cv2.aruco as aruco
import json
import numpy as np
import os
import time

app = Flask(__name__)
app.config.from_pyfile('config.py') # create this file on the server
requiredsnaps = 1

# load tile config json
tileconfig = {}

with open(app.config['TILE_JSON'], 'r', encoding='utf-8') as f:

    for i in range(8):
        next(f)

    tileconfig = json.load(f)

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
    sessionid = app.config['SNAP_PREFIX'] + str(time.time())
    count = request.values['count']
    filename = ('{}/{}-{}.png').format(app.config['SNAP_DIR'], sessionid, count)
    snap = cv2.imdecode(b64image, cv2.IMREAD_COLOR)
    cv2.imwrite(filename, snap)

    # detect tiles after x-many photos snapped
    if int(count) == 1:
        result = runDetect(tileconfig, sessionid, count)
        print(result)
        return jsonify(transformCVforJSON(result))

    return jsonify('another snap required')

@app.route(app.config['ROUTE_PANEL'])
def panel():
    '''
    Panel page for viewing snaps.
    '''
    files = os.listdir(app.config['SNAP_DIR'])
    return render_template('panel.html', files=sorted(files)[::-1])

@app.route(app.config['ROUTE_MONITOR'])
def monitor():
    '''
    Monitor page for simulating the latest snaps recieved.
    '''
    return render_template('monitor.html')

@app.route('/latestsnap', methods=['POST'])
def latestsnap():
    '''
    Most recent photo data endpoint (for monitor page).
    '''
    if app.config['MARKER_TEST_ENABLE']:
        latesttxt = app.config['MARKER_TEST_IMG'][1] + '.txt'
        txtpath = ('{}/{}').format(app.config['MARKER_TEST_IMG'][0], latesttxt)
        filename = str(time.time())
    else:
        latesttxt = sorted(os.listdir(app.config['SNAP_DIR']))[::-1][0]
        txtpath = ('{}/{}').format(app.config['SNAP_DIR'], latesttxt)
        filename = latesttxt

    resultdict = open(txtpath, 'r')
    resultdict = eval(resultdict.readline())

    if latesttxt[-4:] == '.txt':
        return jsonify([filename, transformCVforJSON(resultdict)])
    else:
        return jsonify(0)

@app.route('/test')
def test():
    '''
    For testing/experimenting.
    '''
    return render_template('test.html')

@app.route('/testsnap', methods=['POST'])
def testsubmit():
    '''
    Testing/experimenting endpoint.
    '''
    # save image
    photo = request.files['photo']
    sessionid = app.config['SNAP_PREFIX'] + str(time.time())
    count = request.values['count']
    filename = ('{}/{}-{}.png').format(app.config['SNAP_DIR'], sessionid, count)
    photo.save(filename)

    # detect tiles after x-many photos snapped
    if int(count) == 1:
        result = runDetect(tileconfig, sessionid, count)
        return jsonify(transformCVforJSON(result))

    return jsonify('another snap required')

# utilities

def runDetect(tileconfig, sessionid, count):
    '''
    Run tile detection on an image and return the marker coordinates.
    '''
    if app.config['MARKER_TEST_ENABLE']:
        coords = DetectTiles(app.config['MARKER_TEST_IMG'][1],
                             app.config['MARKER_TEST_IMG'][0],
                             tileconfig)
    else:
        filename = ('{}-{}.png').format(sessionid, count)
        coords = DetectTiles(filename, app.config['SNAP_DIR'], tileconfig)

    return coords.arucoDetect()

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
