import './EnterID.css';
import Button from '../Components/Button';
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import axios from 'axios';

function EnterID() {
    const navigate = useNavigate();  
    const Headtext =  "กรุณากรอกหมายเลขไอดีของท่าน";  
    const [userDetails, setUserDetails] = useState(null);
    const [user_IDs, setUserIDs] = useState("");

    function handleSubmit(event)  {
        event.preventDefault();
    }

    const goToHomeScreen = () => {
        try {
            navigate("/HomeScreen");
        } catch (error) {
            console.error("Error navigating to HomeScreen:", error);
            // Handle the error, e.g., show a notification to the user
        }
    }
    const handleSearch = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get(`http://127.0.0.1:5000/Loginusers?user_IDs=${user_IDs}`);
        setUserDetails(response.data.data);
        
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserDetails(null);
      }
    };
       
    return(
        <>
            <NavBar/>
            <div className="main-bg-EnterID">
                <button className="ArrowLeft" onClick={goToHomeScreen} ><GoArrowLeft /></button>
                <div className =" create">
                    <div className="Headtext">{Headtext}
                    <br/>
                        <center>
                        <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Enter user ID"
                          value={user_IDs}
                          onChange={(e) => setUserIDs(e.target.value)}
                        />

                       </form>
                        </center>
                       
                        <button onClick={handleSearch}>Search</button>

                        {userDetails && (
                          <div>
                            <p>User ID: {userDetails.user_IDs}</p>
                            <p>Name: {userDetails.user_name}</p>
                            <p>Surname: {userDetails.user_surname}</p>
                            <p>Age: {userDetails.user_age}</p>
                            <p>Sex: {userDetails.user_sex}</p>
                          </div>
                        )}
                        
                    </div>
                </div>
            </div>
            

            
           
            
        </>
    );
}

export default EnterID;
