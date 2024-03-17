import './EnterID.css';
import Button from '../Components/Button';
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
//import axios from 'axios';

function EnterID({setUser_ID})  {
    const navigate = useNavigate();  
    const Headtext =  "กรุณากรอกหมายเลขไอดีของท่าน";  
       
    const [user_ID, setUser_IDLocal] = useState('');  
    const [bloodPressure, setBloodPressure] = useState('');
   
    function handleSubmit(event) {
        event.preventDefault();
        sendBloodPressure(); // Call sendBloodPressure function here
    }
    

      const goToHomeScreen = () => {
        try {
            navigate("/HomeScreen");
        } catch (error) {
            console.error("Error navigating to HomeScreen:", error);
            // Handle the error, e.g., show a notification to the user
        }
    }
    
    const LogInUser = async () => {
        try {
            if (user_ID.length === 0 || bloodPressure.length === 0) {
                alert("Please fill in all required fields!");
            } else {
                // Save blood pressure data to the database
                await sendBloodPressure();
                // Set the user ID and navigate to the ShowInfo page
                setUser_ID(user_ID);
                navigate(`/ShowInfo?user_ID=${user_ID}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An unexpected error occurred during login");
        }
    };

    const sendBloodPressure = async () => {
    try {
        // Make a POST request to the server to save blood pressure data
        const response = await fetch('http://127.0.0.1:5000/user_bloodpressure', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_ID: user_ID,
                blood_pressure: bloodPressure,
                date: new Date().toISOString()
            })
        });
        if (response.ok) {
            // Blood pressure data saved successfully
            console.log("Blood pressure saved successfully");
            // Optionally, you can navigate to another page or perform other actions
        } else {
            // Handle error response
            console.error("Failed to save blood pressure:", response.statusText);
        }
    } catch (error) {
        console.error("Error saving blood pressure:", error);
        // Handle the error, e.g., show a notification to the user
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
                            <input type="user_ID" 
                            className="inputblock "  
                            value={user_ID}      
                            onChange={(e) => setUser_IDLocal(e.target.value)}
                       
                            style={{width:'615px'}} 
                            placeholder="กรุณากรอกหมายเลข ID" required />

<br />
                                <input
                                    type="text"
                                    className="inputblock"
                                    value={bloodPressure}
                                    onChange={(e) => setBloodPressure(e.target.value)}
                                    style={{ width: '615px' }}
                                    placeholder="กรุณากรอกความดันโลหิต"
                                    required
                                />
                                <br />


                       </form>
                       
                        </center>

                        <Button  onClick={LogInUser}>ถัดไป</Button>
                    </div>
                </div>
            </div>
            
           
            
        </>
    );
}

export default EnterID;
