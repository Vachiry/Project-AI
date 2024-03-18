import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import "./Questionpage.css";
import Button from "../Components/Button";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import moment from "moment-timezone";
import { Checkbox, FormControlLabel, Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row", // Example change for smaller screens
    },
  },

  sidebarStep: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: "50%",
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "white",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2), // Example change for smaller screens
    },
  },
  completedStep: {
    backgroundColor: "#294597",
  },

  stepper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3, 0),
  },

  step: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    borderRadius: "50%",
    backgroundColor: "#294597",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "white",
    opacity: 0.5, // Set initial opacity for incomplete steps
    "&.active": {
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
  const [transcript, setTranscript] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [Choices, setChoices] = useState([]);
  const [isChoice, setIschoice] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    moment.utc().tz("Asia/Bangkok")
  );
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
            className={`${classes.sidebarStep} ${
              index <= currentQuestionIndex ? classes.completedStep : ""
            }`}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );

  //----------------- Get question to display -----------------------//
  const getAPI = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/questionaire", {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        const questionsArray = responseData.questionaire;

        if (!Array.isArray(questionsArray)) {
          console.error("API response is not an array:", responseData);
          return;
        }

        const sortedQuestions = questionsArray.sort(
          (a, b) => a.question_ID - b.question_ID
        );
        setQuestion_ID(sortedQuestions[currentQuestionIndex]?.question_ID); // Set the initial Question_ID
        setQuestions(sortedQuestions);
      } else {
        const errorData = await response.json();
        console.error("API call failed:", errorData.error);
        window.alert(`Failed to make API call: ${errorData.error}`);
      }
    } catch (error) {
      window.alert("Error during API call. Please try again.");
      console.error("Error during API call:", error);
    }
  };

  //----------------- Use model -----------------------//
  const sendAPI = async (audioBlob) => {
    try {
      if (!audioBlob) {
        console.error("No audio data available.");
        return;
      }

      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.wav");

      const requestData = {
        user_ID: user_ID,
        Question_ID: Question_ID,
      };

      formData.append("data", JSON.stringify(requestData));
      console.log(formData);
      const response = await fetch("http://127.0.0.1:5000/Model", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setTranscript(data.text.transcriptions);
        //setApiResponse(data.text);
      } else {
        const errorData = await response.json();
        console.error("API call failed:", errorData.error);
        window.alert(`Failed to make API call: ${errorData.error}`);
      }
    } catch (error) {
      window.alert("Error during API call. Please try again.");
      console.error("Error during API call:", error);
    }
  };

  //----------------- Post ans -----------------------//
  const GetAns = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/GetAns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user_ID: user_ID }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("ANS :", data);
        setApiResponse(data.text);
      } else {
        const errorData = await response.json();
        console.error("API call failed:", errorData.error);
        window.alert(`Failed to make API call: ${errorData.error}`);
      }
    } catch (error) {
      window.alert("Error during API call. Please try again.");
      console.error("Error during API call:", error);
    }
  };

  const handleRecordingComplete = (blob) => {
    try {
      addAudioElement(blob);
      sendAPI(blob);
    } catch (error) {
      console.error("Error handling recording completion:", error);
    }
  };

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;

    // Find the container where you want to append the audio element
    const container = document.querySelector(".wrap");
    if (container) {
      container.appendChild(audio);
    } else {
      console.error("Container not found");
    }

    return audio; // Return the audio element so it can be removed later if needed
  };

  const removeAudioElement = (audioElement) => {
    if (audioElement && audioElement.parentNode) {
      audioElement.parentNode.removeChild(audioElement);
    } else {
      console.error(
        "Cannot remove audio element: Element or parent node not found"
      );
    }
  };

  //----------------- Get choice -----------------------//
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/choice")
      .then((response) => {
        // Handle the response
        const data = response.data;
        console.log(data);
        const fetchedChoices = data.choice;
        setChoices(fetchedChoices);
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the request:", error);
      });
  }, []);

  const handleCheckboxChange = (choice) => {
    if (selectedChoice.includes(choice)) {
      // If already selected, remove it
      setSelectedChoice(selectedChoice.filter((c) => c !== choice));
    } else {
      // Otherwise, add it
      setSelectedChoice([...selectedChoice, choice]);
    }
  };

  //-------------Next q and stored in database----------//
  const handleNextQuestion = async () => {
    try {
      // Convert selectedChoice array to string
      const selectedChoiceString = selectedChoice.join(", ");

      // Include selected date in the answer string
      let answerString;
      if (currentQuestionIndex === 1) {
        answerString = ` ${selectedDate.toISOString().split("T")[0]}`;
      } else {
        answerString = selectedChoiceString;
      }

      const response = await axios.post("http://127.0.0.1:5000/GetAns", {
        user_ID: user_ID,
        question_ID: Question_ID,
        answer: answerString,
      });

      if (response.ok) {
        console.log("Answer with date stored successfully:", response.data);
      } else {
        console.error("Failed to store answer with date:", response.data);
      }
    } catch (error) {
      console.error("Error storing answer with date:", error);
    }

    if (currentQuestionIndex === questions.length - 1) {
      // If it's the last question
      alert("Thank you"); // Show a thank you message
      navigate("/HomeScreen"); // Navigate back to the home screen
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestion_ID(questions[currentQuestionIndex + 1]?.question_ID);
      setSelectedChoice([]);
    }
  };
  {
    /*
  const handlePreviousQuestion = () => {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestion_ID(questions[currentQuestionIndex - 1]?.question_ID); // Update Question_ID when moving to the previous question
  };  */
  }

  {
    /*
    const handleNextQuestion = () => {
      setCurrentQuestionIndex((prevIndex) => {
        setQuestion_ID(questions[prevIndex + 1]?.question_ID); // Set the question_ID for the next question
       
      });
    }; */
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) {
      // If currentQuestionIndex is 0, navigate to Form
      navigate(`/Form/${user_ID}`);
      console.log("Navigate to Form");
    } else {
      // For other cases, decrement the currentQuestionIndex
      setCurrentQuestionIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        if (newIndex < 0) {
          return 0; // Ensure the index doesn't go below 0
        } else {
          setQuestion_ID(questions[newIndex]?.question_ID); // Set the question_ID for the previous question
          return newIndex;
        }
      });
    }
  };

  const filterChoices = (choices, currentIndex) => {
    if (currentIndex === 0) {
      return choices.filter((choice) => choice.type === "symptom");
    } else if (currentIndex === 2) {
      return choices.filter((choice) => choice.type === "rate");
    } else if (currentIndex >= 3 && currentIndex <= 9) {
      return choices.filter((choice) => choice.type === "yesno");
    } else if (currentIndex === 1) {
      return (
        <div className="calendar-container">
          <Calendar
            onChange={(date) =>
              setSelectedDate(moment(date).tz("Asia/Bangkok"))
            }
            value={selectedDate}
          />
        </div>
      );
    } else {
      return [];
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
    navigate("/HomeScreen");
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <NavBar />

      <div>
        <div className="main-bg-question">
          <div className="stepper">{renderSidebar()} </div>
          <div className="wrap">
            <Switch
              checked={isChoice}
              onChange={() => {
                if (isChoice) {
                  const audioElement = document.querySelector("audio");
                  if (audioElement) {
                    removeAudioElement(audioElement);
                  }
                }
                setIschoice(!isChoice);
              }}
              color="primary"
              name="audioSwitch"
              inputProps={{ "aria-label": "toggle audio recording" }}
            />
            {isChoice ? null : (
              <div className="ContainerRecorder">
                <AudioRecorder
                  onRecordingComplete={handleRecordingComplete}
                  recorderControls={recorderControls}
                  showVisualizer={true}
                />
                {apiResponse && renderApiResponse()}
              </div>
            )}
            {currentQuestion && (
              <div className="QuestionContainer">
                <div className="QuestionStyled">
                  <h1>{currentQuestion.question}</h1>
                  {console.log(Question_ID)}
                </div>
              </div>
            )}
            <h2 className="transcript">
              {isChoice ? "กรุณาเลือกตัวเลือก" : "คำที่พูด"}
            </h2>
            <pre>{isChoice ? " " : transcript}</pre>
            {isChoice && currentQuestionIndex !== null && (
              <div>
                {currentQuestionIndex === 1
                  ? filterChoices(Choices, currentQuestionIndex)
                  : filterChoices(Choices, currentQuestionIndex).map(
                      (choice) => (
                        <div key={choice.choice_ID}>
                          {/* Use FormControlLabel to associate Checkbox with its label */}
                          <FormControlLabel
                            control={
                              <Checkbox
                                // Use checked prop to determine whether the checkbox is checked
                                checked={selectedChoice.includes(choice.choice)}
                                // Use onChange to handle checkbox state changes
                                onChange={() =>
                                  handleCheckboxChange(choice.choice)
                                }
                                // Use style prop to set the size of the checkbox
                                style={{ width: "100px", height: "50px" }} // Adjust the size as needed
                              />
                            }
                            label={choice.choice} // Label for the checkbox
                            style={{ fontSize: "4rem" }} // Adjust the font size of the label as needed
                          />
                        </div>
                      )
                    )}
              </div>
            )}

            <div className="ButtonStyled">
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                ย้อนกลับ
              </Button>
              <Button onClick={handleNextQuestion}>ถัดไป</Button>

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
