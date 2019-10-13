import cv2
import cv2.aruco as aruco

photo = cv2.imread('test.png')
arucodict = aruco.Dictionary_get(aruco.DICT_ARUCO_ORIGINAL)
params = aruco.DetectorParameters_create()
corners, ids, rejectedpoints = aruco.detectMarkers(photo, arucodict, parameters=params)

aruco.drawDetectedMarkers(photo, corners, ids)
aruco.drawDetectedMarkers(photo, rejectedpoints, borderColor=(100, 0, 240))

cv2.imwrite('result.png', photo)
cv2.waitKey(0)
