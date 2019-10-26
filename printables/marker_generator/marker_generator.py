import cv2
import cv2.aruco as aruco

arucodict = aruco.Dictionary_get(aruco.DICT_APRILTAG_16h5)

for i in range(30):
    marker = aruco.drawMarker(arucodict, i, 1000)
    cv2.imwrite('marker{}.png'.format(i), marker)
