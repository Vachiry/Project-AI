import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './Questionpage.css';
import Button from '../Components/Button';
import {  makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(3),
      
    },

    sidebarStep: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      borderRadius: '50%',
      backgroundColor: 'grey',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      color: 'white',
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(8), 
    
    },
    completedStep: {
      backgroundColor: '#294597',
    },

    stepper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(3, 0),
    },

    step: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      borderRadius: '50%',
      backgroundColor: '#294597',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      color: 'white',
      opacity: 0.5, // Set initial opacity for incomplete steps
      '&.active': {
        opacity: 1, // Set opacity to 1 for the active step
      },
      
    },
    
  }));


const Questionpage = () => {
    const classes = useStyles();
    const [apiResponse, setApiResponse] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [Question_ID, setQuestion_ID] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { user_ID } = useParams();
    const navigate = useNavigate();

    const recorderControls = useAudioRecorder(
        {
            noiseSuppression: true,
            echoCancellation: true,
        },
        (err) => console.table(err) // onNotAllowedOrFound
    );


    //-----------stepper bar--------//
         const renderSidebar = () => (
             <div className={classes.sidebar}>
                 <div className={classes.stepper}>
                 {questions.map((_, index) => (
                   <div
                     key={index}
                     className={`${classes.sidebarStep} ${index <= currentQuestionIndex ? classes.completedStep : ''}`}
                     onClick={() => setCurrentQuestionIndex(index)}
                   >
                   {index + 1}
               
                    </div>
             
                   ))}
               </div>
             </div>
      );
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
                       //setApiResponse(data.text);
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
      setCurrentQuestionIndex((prevIndex) => {
        setQuestion_ID(questions[prevIndex + 1]?.question_ID); // Set the question_ID for the next question
        return Math.min(prevIndex + 1, questions.length - 1);
      });
    };
    
      const handlePreviousQuestion = () => {
        if (currentQuestionIndex === 0) {
          // If currentQuestionIndex is 0, navigate to Form
          navigate(`/Form/${user_ID}`);
          console.log("Navigate to Form");
        } 
        else if (currentQuestionIndex === 1) {
          // If currentQuestionIndex is 1, navigate to the question at index 0
          setCurrentQuestionIndex(0);
        } 
        else {
          // For other cases, decrement the currentQuestionIndex
          setCurrentQuestionIndex((prevIndex) => {
            setQuestion_ID(questions[prevIndex - 1]?.question_ID); // Set the question_ID for the previous question
            return Math.max(prevIndex - 1, 0);
          
          });
        }
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
      navigate('/HomeScreen');
  };
      
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
              <NavBar />
     
                 <div>
                     <div className="main-bg-question">
                     
                         {renderSidebar()}
      
         </div>
          <div className="wrap">
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
                 <div className="QuestionContainer">
                <div className="QuestionStyled">
                  <h1>{currentQuestion.question}</h1>
                  {console.log(Question_ID)}
                  </div>
                  <div className="ButtonStyled">
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
        
      </>
    );
};

export default Questionpage;
