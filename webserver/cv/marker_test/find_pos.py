import cv2
import cv2.aruco as aruco
import numpy
from matplotlib import pyplot as plt

photo = cv2.imread('test.png')
arucodict = aruco.Dictionary_get(aruco.DICT_ARUCO_ORIGINAL)
params = aruco.DetectorParameters_create()
corners, ids, rejectedpoints = aruco.detectMarkers(photo, arucodict, parameters=params)

## extract unique and their index
uniqueValues, index = numpy.unique(ids, return_index=True)

## go through each vertical/ horizontal aruco to find unique and get their index
xaxis = []
yaxis = []

## this assumes the aruco ids for row indicators are 0—5, and columns are 20—30. 
for i in index:
    if (ids[i][0] <= 5) and (ids[i][0] >= 0):
        ## index markers for y-axis (columns)
        yaxis.append(i)
    if (ids[i][0] > 20) and (ids[i][0] < 31):
        ## index markers for x-axis (rows)
        xaxis.append(i)

## go through the list and find midpoint for each marker to produce hlines
ymidPoints = []
for i in range(len(yaxis)):
    start = corners[yaxis[i]]
    startY = start[0][0][1]
    endY = start[0][2][1]
    d = (endY-startY) / 2
    ymidPoints.append(startY + d)
    plt.hlines(ymidPoints[i],0,500)

## go through the list and find midpoint for each marker to produce vlines
xmidPoints = []
for i in range(len(xaxis)):
    start = corners[xaxis[i]]
    startX = start[0][2][0]
    endX = start[0][0][0]
    d = (endX-startX) / 2
    xmidPoints.append(startX + d)
    plt.vlines(xmidPoints[i],0,400)

## check each ids types and place them in position
mobjects = []
xplotobj = []
yplotobj = []
cols = []
rows = []
labels = []

## extract non-position markers
for i in range(len(ids)):
    if ids[i][0] > 80:
        # extract indexes of musical objects and put into a list
        mobjects.append(i)

## go through all objects to determine type, row, and col, and return [col, row, type]
for i in range(len(mobjects)):
    # pick a point on marker
    sample = corners[mobjects[i]]
    cx = sample[0][0][0]
    cy = sample[0][0][1]
    
    ## check type of objects
    
    # this is an arrow object
    ## let's determine its orientation
    if (ids[mobjects[i]] == 89):
        if (sample[0][0][0] - sample [0][2][0]) > 0:
            A = 1
        else:
            A = 0
            
        if (sample[0][0][1] - sample [0][2][1]) > 0:
            B = 1
        else:
            B = 0
            
        if A == 1 and B == 1:
            labels.append('S')
            print('down arrow')
        elif A == 1 and B == 0:
            labels.append('E')
            print('right arrow')
        elif A == 0 and B == 1:
            labels.append('W')
            print('left arrow')
        elif A == 0 and B == 0:
            labels.append('N')
            print('up arrow')
    
    if(cx < xmidPoints[0]):
        xplotobj.append(xmidPoints[0])
        cols.append(1)
    
    for x in range(len(xmidPoints)-1):
        if(cx > xmidPoints[x]) and (cx < xmidPoints[x+1]):
            xplotobj.append(xmidPoints[x])
            cols.append(x+2)
    
    if(cx > xmidPoints[len(xmidPoints)-1]):
        xplotobj.append(xmidPoints[len(xmidPoints)-1])
        cols.append(len(xmidPoints)+1)
        
    for y in range(len(ymidPoints)-1):
        if(cy > ymidPoints[y]) and (cy < ymidPoints[y+1]):
            yplotobj.append(ymidPoints[y])
            rows.append(y+1)
    if (cy < ymidPoints[0]):
        yplotobj.append(ymidPoints[0])
        rows.append(1)

## check shape of rows, cols, and types
if(len(rows) != len(cols)) or (len(labels) != len(cols)) or (len(labels) != len(rows)):
    print('dim error!!')
else:
    for i in range(len(mobjects)):
        x = cols[i]
        y = rows[i]
        plt.scatter(x, y, marker='o', color='green')
        plt.text(x+0.25, y+0.25, labels[i], fontsize=9)
    
    plt.xlim(0, 12)
    plt.ylim(6, 0)
    plt.show()
    print(rows)
    print(cols)
    print(labels)