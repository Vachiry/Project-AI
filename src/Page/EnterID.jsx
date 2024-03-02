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
  
    

    
     const [user_ID, setUser_ID] = useState('');  
    
   
   
    function handleSubmit(event)  {
        event.preventDefault();
     
    }

      function handleChange(event) {
        const {value, name}= event.target
        setUser_ID(prevNote => ({
            ...prevNote, [name] : value})
        )}
    
   
      const goToHomeScreen = () => {
        try {
            navigate("/HomeScreen");
        } catch (error) {
            console.error("Error navigating to HomeScreen:", error);
            // Handle the error, e.g., show a notification to the user
        }
    }

 
      const LogInUser = () => {
        if (user_ID.length  === 0) {
          alert("Please fill in all required fields!");
        } else {
          axios
            .post('http://127.0.0.1:5000/LoginKiosk', {
              user_ID : user_ID
            }, { withCredentials: true })
            .then(function (response) {
                console.log(response);                    
                navigate('/ShowInfo');
              })
            .catch(function (error) {
              console.log(error, 'error');
              if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
              }
            });
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
                            onChange={(e) => setUser_ID(e.target.value)}
                       
                            style={{width:'615px'}} 
                            placeholder="กรุณากรอกหมายเลข ID" required />

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
