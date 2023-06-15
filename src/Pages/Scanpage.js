import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const PrescriptionUpload = () => {
  const webcamRef = useRef(null);
  const [prescriptionImage, setPrescriptionImage] = useState(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPrescriptionImage(imageSrc);
  };

  return (
    <div>
      <h2>Prescription Upload</h2>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />

      <div>
        <button onClick={handleCapture}>Take Picture</button>
      </div>

      {prescriptionImage && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={prescriptionImage} alt="Prescription" />
        </div>
      )}
    </div>
  );
};

export default PrescriptionUpload;
