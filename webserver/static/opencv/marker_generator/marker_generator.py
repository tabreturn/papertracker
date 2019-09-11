import cv2
import cv2.aruco as aruco

arucodict = aruco.Dictionary_get(aruco.DICT_ARUCO_ORIGINAL)

for i in range(100):
    marker = aruco.drawMarker(arucodict, i, 1000)
    cv2.imwrite('marker{}.png'.format(i), marker)
