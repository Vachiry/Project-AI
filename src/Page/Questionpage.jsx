import NavBar from "../Components/NavBar"
import './Questionpage.css';
import { useNavigate } from "react-router-dom";
//import Button from "../Components/Button";
import { GoArrowLeft } from "react-icons/go";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { useState } from "react";
//import React from 'react'
//import { FaMicrophone } from "react-icons/fa6";

function Questionpage() {

  const [apiResponse, setApiResponse] = useState(null);
  const recorderControls = useAudioRecorder(
      {
          noiseSuppression: true,
          echoCancellation: true,
      },
      (err) => console.table(err) // onNotAllowedOrFound
  );

  const addAudioElement = (blob) => {
      const url = URL.createObjectURL(blob);
      const audio = document.createElement('audio');
      audio.src = url;
      audio.controls = true;
      document.body.appendChild(audio);
  };

  const sendAPI = async (audioBlob) => {
      try {
          if (!audioBlob) {
              console.error('No audio data available.');
              return;
          }

          const formData = new FormData();
          formData.append('audio', audioBlob, 'audio.wav'); // Append audio blob to FormData

          const response = await fetch('http://127.0.0.1:5000/Model', {
              method: 'POST',
              body: formData,
          });

          console.log(formData);

          if (response.ok) {
              const data = await response.json();
              console.log(data);
              setApiResponse(data.text);
              // Perform actions upon successful API call
          } else {
              const errorData = await response.json();
              console.error('API call failed:', errorData.error);
              window.alert(`Failed to make API call: ${errorData.error}`);
              // Handle API call failure
          }
      } catch (error) {
          window.alert('Error during API call. Please try again.');
          console.error('Error during API call:', error);
          // Handle other errors
      }
  };

  const handleRecordingComplete = (blob) => {
      addAudioElement(blob);
      sendAPI(blob); // Pass the blob directly to the sendAPI function
  };
    

    const navigate = useNavigate();           
    const goToForm = () => {
    navigate("/Form")
    }  
    
  return (
   
   <div>
     
      <NavBar/>
      <div className="main-bg-question">
                <button className="ArrowLeft" onClick={goToForm} ><GoArrowLeft /></button>
                
                <div className="Container">
                     
           
                <AudioRecorder className="audio-recorder"
                   onRecordingComplete={handleRecordingComplete}
                   recorderControls={recorderControls}
                   showVisualizer={true}
                  
                    />
                  
                     {apiResponse && (
                         <div>
                             <h2>API Response:</h2>
                             <pre>{apiResponse}</pre>
                             <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                         </div>
                     )}
                     </div>
 
              
         </div>
     </div>
  )
}

export default Questionpage
