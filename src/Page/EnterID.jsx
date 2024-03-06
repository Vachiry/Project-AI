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
    
      const LogInUser = async () => {
        try {

             if (user_ID.length  === 0) {
             alert("Please fill in all required fields!");
        }
        else{
             setUser_ID(user_ID); 
             navigate(`/ShowInfo?user_ID=${user_ID}`);

        }}
        catch (error) {
         
              console.error("Error during login:", error);
              alert("An unexpected error occurred during login");
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
