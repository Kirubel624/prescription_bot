import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const ScanPage = () => {
  const webcamRef = useRef(null);
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const [isCameraVisible, setCameraVisible] = useState(true);
  const [isFrontCamera, setFrontCamera] = useState(true);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPrescriptionImage(imageSrc);
    setCameraVisible(false);
  };

  const handleRemove = () => {
    setPrescriptionImage(null);
    setCameraVisible(true);
  };

  const handleCameraSwitch = () => {
    setFrontCamera(!isFrontCamera);
  };

  return (
    <div>
      <h2>Prescription Upload</h2>

      {isCameraVisible ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={!isFrontCamera}
        />
      ) : null}

      <div>
        {isCameraVisible ? (
          <button onClick={handleCapture}>Take Picture</button>
        ) : (
          <button onClick={handleRemove}>Remove Picture</button>
        )}
        <button onClick={handleCameraSwitch}>Switch Camera</button>
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

export default ScanPage;
