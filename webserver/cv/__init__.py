import cv2
import cv2.aruco as aruco

class DetectTiles:
    '''Detects tile grid coordinates.'''

    def __init__(self, snaps, outdir):
        self.snaps = snaps
        self.outdir = outdir

    def arucoDetect(self):
        arucodict = aruco.Dictionary_get(aruco.DICT_ARUCO_ORIGINAL)
        params = aruco.DetectorParameters_create()

        for snap in self.snaps:
            img = cv2.imread(('{}/{}.png').format(self.outdir, snap))
            corners, ids, rejectedpoints = aruco.detectMarkers(img, arucodict, parameters=params)
            aruco.drawDetectedMarkers(img, corners, ids)
            aruco.drawDetectedMarkers(img, rejectedpoints, borderColor=(100, 0, 240))
            cv2.imwrite(('{}/{}-result.png').format(self.outdir, snap), img)

        return ids.tolist()
