import cv2
import cv2.aruco as aruco

photo = cv2.imread('test_0,1,2,3,4,5.jpg')
arucodict = aruco.Dictionary_get(aruco.DICT_4X4_250)
params = aruco.DetectorParameters_create()
corners, ids, rejectedpoints = aruco.detectMarkers(photo, arucodict, parameters=params)

aruco.drawDetectedMarkers(photo, corners, ids)
#aruco.drawDetectedMarkers(photo, rejectedpoints, borderColor=(100, 0, 240))

cv2.imshow('result', photo);
cv2.waitKey(0);
