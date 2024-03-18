//import "../App.css";
import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import "../Page/ShowInfo.css";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import axios from "axios";

function ShowInfo({ user_ID }) {
  const Headtext = "สวัสดีค่ะ";

  const navigate = useNavigate();
  const EnterID = () => {
    navigate("/EnterID");
  };

  const goToForm = () => {
    navigate(`/Form/${user_ID}`);
  };

  const [userDetails, setUserDetails] = useState(null);
  const [userBlood, setUserBlood] = useState({ SYS: null, DIA: null });
  const [error, setError] = useState(null);

  const getBloodPressureStatus = (SYS, DIA) => {
    if (SYS < 120 && DIA < 80) {
      return "ความดันเหมาะสม";
    } else if (SYS >= 120 && SYS <= 129 && DIA >= 80 && DIA <= 84) {
      return "ความดันปกติ";
    } else if (SYS >= 130 && SYS <= 139 && DIA >= 85 && DIA <= 89) {
      return "ความดันสูงกว่าปกติ";
    } else if (SYS >= 140 && SYS <= 159 && DIA >= 90 && DIA <= 99) {
      return "เสี่ยงโรคความดันโลหิตสูง ระยะเริ่มแรก";
    } else if (SYS >= 160 && SYS <= 179 && DIA >= 100 && DIA <= 109) {
      return "เสี่ยงโรคความดันโลหิตสูง ระยะปานกลาง";
    } else if (SYS >= 180 && DIA >= 110) {
      return "เสี่ยงโรคความดันโลหิตสูง ระยะรุนแรง";
    } else {
      return "ไม่ถูกต้อง";
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/getUserDetails`,
          {
            params: { user_ID },
          }
        );
        setUserDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserDetails(null);
      }
    };

    fetchUserDetails();
  }, [user_ID]);

  useEffect(() => {
    const fetchUserBlood = async () => {
      try {
        console.log("Fetching blood pressure data for user ID:", user_ID);
        const response = await axios.get(
          `http://127.0.0.1:5000/user_bloodpressure`,
          {
            params: { user_ID },
          }
        );
        console.log("Blood pressure data:", response.data.bloodpressure);

        // Extract the last recorded blood pressure data for the user
        const latestEntry =
          response.data.bloodpressure[response.data.bloodpressure.length - 1];

        // Check if there is blood pressure data for the user
        if (latestEntry) {
          // Set the last recorded blood pressure data
          setUserBlood({ SYS: latestEntry.SYS, DIA: latestEntry.DIA });
        } else {
          setUserBlood({ SYS: null, DIA: null });
        }
      } catch (error) {
        console.error("Error fetching user blood pressure:", error);
        setError("Error fetching user blood pressure. Please try again later.");
      }
    };
    fetchUserBlood();
  }, [user_ID]);

  console.log("userBlood:", userBlood);
  console.log(userDetails);
  console.log(user_ID);

  return (
    <>
      <NavBar />
      <div className="main-bg-ShowInfo">
        <button className="ArrowLeft" onClick={EnterID}>
          <GoArrowLeft />
        </button>
        <div className="Headtext">{Headtext}</div>
        <div className="ContainerShowinfo">
          <div className="auth-wrapper">
            {error && <p>{error}</p>}
            {userDetails && (
              <>
                <h1>User ID: {userDetails.user_ID}</h1>
                <h1>Name: {userDetails.user_name}</h1>
                <h1>Surname: {userDetails.user_surname}</h1>
                <h1>Sex: {userDetails.user_sex}</h1>
                <h1>Age: {userDetails.user_age}</h1>
                <h1>
                  ผลการวัดความดัน:{" "}
                  {getBloodPressureStatus(userBlood.SYS, userBlood.DIA)}
                </h1>
              </>
            )}
          </div>
        </div>
        <div className="Button">
          <Button onClick={goToForm}>ถัดไป</Button>
        </div>
      </div>
    </>
  );
}

export default ShowInfo;
