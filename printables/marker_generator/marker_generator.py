import cv2
import cv2.aruco as aruco

arucodict = aruco.Dictionary_get(aruco.DICT_4X4_50)

for i in range(50):
    marker = aruco.drawMarker(arucodict, i, 1000)
    cv2.imwrite('marker{}.png'.format(i), marker)
