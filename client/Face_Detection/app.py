from flask import Flask, request, flash, request, jsonify
from werkzeug.utils import secure_filename
import numpy as np
from flask_cors import CORS
import cv2
app = Flask(__name__)
CORS(app)


@app.route("/", methods=['POST'])
def face_detection():
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    file = request.files['file']
    npimg = np.fromfile(file, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    grayimg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = cv2.equalizeHist(grayimg)
    faces = face_cascade.detectMultiScale(img, 1.1, 4)

    if len(faces) == 0:
        return jsonify({
            "errorMessage": "No face detected. Must be a face picture",
        }), 403
    elif len(faces) == 1:
        return jsonify({
            "successMessage": "Perfect",
        }), 200
    else:
        return jsonify({
            "errorMessage": "Please use an image which contains a clear face",
        }), 403


# for (x, y, w, h) in faces:
     #   cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
    #cv2.imshow('img', img)
    # cv2.waitKey()
if __name__ == '__main__':
    app.run(port=80, debug=True)

# set FLASK_APP = app.py
# set FLASK_RUN_PORT = 80
