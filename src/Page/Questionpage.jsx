import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import NavBar from '../Components/NavBar';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './Questionpage.css';

const Questionpage = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const recorderControls = useAudioRecorder(
        {
            noiseSuppression: true,
            echoCancellation: true,
        },
        (err) => console.table(err) // onNotAllowedOrFound
    );

    const navigate = useNavigate();

    // ...

const getAPI = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/questionaire', {
            method: 'GET',
        });

        if (response.ok) {
            const responseData = await response.json();
            const questionsArray = responseData.questionaire;

            if (!Array.isArray(questionsArray)) {
                console.error('API response is not an array:', responseData);
                return;
            }

            const sortedQuestions = questionsArray.sort((a, b) => a.question_ID - b.question_ID);
            setQuestions(sortedQuestions);
        } else {
            const errorData = await response.json();
            console.error('API call failed:', errorData.error);
            window.alert(`Failed to make API call: ${errorData.error}`);
        }
    } catch (error) {
        window.alert('Error during API call. Please try again.');
        console.error('Error during API call:', error);
    }
};

// ...

    

    const sendAPI = async (audioBlob) => {
        try {
            if (!audioBlob) {
                console.error('No audio data available.');
                return;
            }

            const formData = new FormData();
            formData.append('audio', audioBlob, 'audio.wav');

            const response = await fetch('http://127.0.0.1:5000/Model', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setApiResponse(data.text);
            } else {
                const errorData = await response.json();
                console.error('API call failed:', errorData.error);
                window.alert(`Failed to make API call: ${errorData.error}`);
            }
        } catch (error) {
            window.alert('Error during API call. Please try again.');
            console.error('Error during API call:', error);
        }
    };

    const handleRecordingComplete = (blob) => {
        try {
            addAudioElement(blob);
            sendAPI(blob);
        } catch (error) {
            console.error('Error handling recording completion:', error);
        }
    };

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement('audio');
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const goToForm = () => {
        navigate('/Form');
    };

    const renderApiResponse = () => (
        <div>
            <h2>API Response:</h2>
            <pre>{apiResponse}</pre>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
    );

    useEffect(() => {
        getAPI();
    }, []);

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            <NavBar />
            <div>
                <div className="main-bg-question">
                    <button className="ArrowLeft" onClick={goToForm}>
                        <GoArrowLeft />
                    </button>
                    <div className="Container">
                        <AudioRecorder
                            onRecordingComplete={handleRecordingComplete}
                            recorderControls={recorderControls}
                            showVisualizer={true}
                        />
                        {apiResponse && renderApiResponse()}
                    </div>
                    <div>
                        {currentQuestion && (
                            <div>
                                <p>{currentQuestion.question}</p>
                                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                                    Previous Question
                                </button>
                                <button onClick={handleNextQuestion}>Next Question</button>
                            </div>
                        )}
                        {currentQuestionIndex === questions.length && (
                            <div>
                                <p>All questions answered! Display final result or perform final actions.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Questionpage;
