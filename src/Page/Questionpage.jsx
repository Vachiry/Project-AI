import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import NavBar from '../Components/NavBar';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './Questionpage.css';
import Button from '../Components/Button';
import { useParams } from 'react-router-dom';

const Questionpage = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [Question_ID, setQuestion_ID] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { user_ID } = useParams();
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
                setQuestion_ID(sortedQuestions[currentQuestionIndex]?.question_ID); // Set the initial Question_ID
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

            const requestData = {
                user_ID: user_ID,
                Question_ID: Question_ID
            };

            formData.append('data', JSON.stringify(requestData));
            console.log(formData);
            const response = await fetch('http://127.0.0.1:5000/Model', {
                method: 'POST',
                body: formData,

            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                // setApiResponse(data.text);
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
    const GetAns = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/GetAns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ user_ID: user_ID }),

            });

            if (response.ok) {
                const data = await response.json();
                console.log('ANS :', data)
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
        setQuestion_ID(questions[currentQuestionIndex + 1]?.question_ID); // Update Question_ID when moving to the next question
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setQuestion_ID(questions[currentQuestionIndex - 1]?.question_ID); // Update Question_ID when moving to the previous question
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

    const Logout = () => {
        // Perform logout actions
        // For example, redirect to the login page
        navigate('/EnterID');
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            <NavBar />
            <div>
                <div className="main-bg-question">
                    <button className="ArrowLeft" onClick={goToForm}>
                        <GoArrowLeft />
                    </button>
                    <div className="stepper">
                        <p>Step {currentQuestionIndex + 1}/{questions.length}</p>
                        {/* You can customize the stepper appearance as needed */}
                    </div>
                    <div className='wrap'>

                        <div className="ContainerRecorder"> 
                            <AudioRecorder
                                onRecordingComplete={handleRecordingComplete}
                                recorderControls={recorderControls}
                                showVisualizer={true}
                            />
                            {apiResponse && renderApiResponse()}
                        </div>
                        <div>
                            {currentQuestion && (
                                <div className='QuestionStyled'>
                                    <h1>{currentQuestion.question}</h1>
                                    {console.log(Question_ID)}
                                    <div className='ButtonStyled'>
                                        <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                                            ย้อนกลับ
                                        </Button>
                                        <Button onClick={handleNextQuestion}>ถัดไป</Button>
                                    </div>
                                </div>
                            )}
                            {currentQuestionIndex === questions.length && (
                                <div>
                                    <button onClick={GetAns}>Finish</button>
                                    <button onClick={Logout}>Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Questionpage;
