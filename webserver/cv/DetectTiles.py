import cv2
import cv2.aruco as aruco
import numpy

def tileConfig(marker):
    '''
    A list of marker-keyword mappings.
    Until a central configuration is devised, ensure that these values match
    those in Tile.js.
    The arrow symbol is defined further down as marker 49.
    '''
    if   (marker == 35): return 'yellow'
    elif (marker == 36): return 'magenta'
    elif (marker == 37): return 'red'
    elif (marker == 38): return 'green'
    elif (marker == 40): return 'A_hat'
    elif (marker == 41): return 'A_kick1'
    elif (marker == 42): return 'A_kick2'
    elif (marker == 43): return 'A_stab1'
    elif (marker == 44): return 'A_stab2'
    return

class DetectTiles:
    '''
    Detects the tile grid coordinates.
    '''

    def __init__(self, snap, outdir):
        self.snap = snap
        self.outdir = outdir

    def arucoDetect(self):
        arucodict = aruco.Dictionary_get(aruco.DICT_4X4_50)
        params = aruco.DetectorParameters_create()

        # read in image
        img = cv2.imread(('{}/{}.png').format(self.outdir, self.snap))
        corners, ids, rejectedpoints = aruco.detectMarkers(img, arucodict, parameters=params)
        # draw detected markers and save new result image
        aruco.drawDetectedMarkers(img, corners, ids)
        aruco.drawDetectedMarkers(img, rejectedpoints, borderColor=(100, 0, 240))
        cv2.imwrite(('{}/{}-result.png').format(self.outdir, self.snap), img)

        ## extract unique and their index
        uniqueValues, index = numpy.unique(ids, return_index=True)

        ## go through each vertical/ horizontal aruco to find unique and get their index
        xaxis = []
        yaxis = []

        ## this assumes the aruco ids for row indicators are 0-5, and columns are 20-30.
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

        ## go through the list and find midpoint for each marker to produce vlines
        xmidPoints = []
        for i in range(len(xaxis)):
            start = corners[xaxis[i]]
            startX = start[0][2][0]
            endX = start[0][0][0]
            d = (endX-startX) / 2
            xmidPoints.append(startX + d)

        ## check each ids types and place them in position
        mobjects = []
        xplotobj = []
        yplotobj = []
        cols = []
        rows = []
        labels = []

        ## extract non-position markers
        for i in range(len(ids)):
            if ids[i][0] >= 31: # !!! used to be > 50 !!!
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
            if (ids[mobjects[i]] == 49):
                if (sample[0][0][0] - sample [0][2][0]) > 0:
                    A = 1
                else:
                    A = 0

                if (sample[0][0][1] - sample [0][2][1]) > 0:
                    B = 1
                else:
                    B = 0

                if A == 1 and B == 1:
                    labels.append('W')
                elif A == 1 and B == 0:
                    labels.append('S')
                elif A == 0 and B == 1:
                    labels.append('N')
                elif A == 0 and B == 0:
                    labels.append('E')

            ## object configs
            else:
                labels.append( tileConfig(ids[mobjects[i]]) )

            if(cx < xmidPoints[0]):
                cols.append(1)

            for x in range(len(xmidPoints)-1):
                if(cx > xmidPoints[x]) and (cx < xmidPoints[x+1]):
                    cols.append(x+2)

            if(cx > xmidPoints[len(xmidPoints)-1]):
                cols.append(len(xmidPoints)+1)

            for y in range(len(ymidPoints)-1):
                if(cy > ymidPoints[y]) and (cy < ymidPoints[y+1]):
                    rows.append(y+1)

            if (cy < ymidPoints[0]):
                rows.append(1)

        ## check shape of rows, cols, and types
        if(len(rows) != len(cols)) or (len(labels) != len(cols)) or (len(labels) != len(rows)):
            print('dim error!!')
            return 'dim error!!'
        else:
            return {
                'columns':cols,
                'rows': rows,
                'labels': labels
            }
