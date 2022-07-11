import './App.css';
import React, { useState, useRef, useCallback } from 'react';
import { fileUpload } from './api/api';
import ReactWebcame from 'react-webcam';
import {fileUploaddb} from './api/api';

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: "user"
};


function App() {
  const [files, setFiles] = useState()
  const webcamRef = useRef(null);
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false)

  const handleSendFile = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('images', files)
    const result = await fileUpload(data)
    if (result.length > 0) {
      fileUploaddb(result)
      
    }
  }
  const handleScanFile = (e) => {
    setShow(!show)
  }

  function abc (result) {
    console.log('abc',result)
    fileUploaddb(result)

  }

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)
    setFiles(imageSrc)
    setImage(imageSrc);
    const data = new FormData()
    data.append('images', imageSrc)
    console.log(data)
    const result = await fileUpload(data)
    
    if (result.length > 0) {
    
      abc(result)
    }

  }, [webcamRef]);

  return (
    <div className='container'>
      <div className="Upload_Document">
        <div className="mb-3" >
          <input type="file" className="form-control" id="exampleInputPassword1" onChange={event => {
            const file = event.target.files[0];
            setFiles(file)
          }} />
          <button className="btn btn-outline-secondary" onClick={handleSendFile} style={{ marginRight: "5%" }} type="button">Upload</button>
          <button className="btn btn-outline-success" onClick={handleScanFile} type="button">Scan Document</button>
        </div>
      </div>

      {show ?
        <div style={{display:"flex"}} className="maincontainer">
          <div className="Webcame">
            <ReactWebcame
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="react-webcame"
            />
            <button className='Webcame_button' onClick={capture}>Capture photo</button>
          </div>

          <div className="Preview">
            <img src={image} />
          </div>
        </div> : null}


    </div>

  )
}

export default App
