import '..StlyeSheet/';
// import Button from '../Components/Button';
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
<<<<<<< HEAD

function EnterID({ setUserIDs }) {
  const navigate = useNavigate();  
  const Headtext =  "กรุณากรอกหมายเลขไอดีของท่าน";  
  const [user_IDs, setUserIDsLocal] = useState("");

  const goToHomeScreen = () => {
      try {
          navigate("/HomeScreen");
      } catch (error) {
          console.error("Error navigating to HomeScreen:", error);
      }
  }
  const handleSearch = async () => {
      setUserIDs(user_IDs); 
      navigate(`/ShowInfo?user_IDs=${user_IDs}`);
  };
    
=======
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

             if (user_ID.length  === 0 ) {
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
       
>>>>>>> 98c94c6b08216e2d687127954901c573f992e98f
    return(
        <>
            <NavBar/>
            <div className="main-bg-EnterID">
                <button className="ArrowLeft" onClick={goToHomeScreen} ><GoArrowLeft /></button>
                <div className =" create">
                    <div className="Headtext">{Headtext}
                    <br/>
                        <center>
<<<<<<< HEAD
                          <form>
                            <input
                              type="text"
                              placeholder="Enter user ID"
                              value={user_IDs}
                              onChange={(e) => setUserIDsLocal(e.target.value)}
                            />
                          </form>
=======
                        <form onSubmit={handleSubmit}>
                            <input type="user_ID" 
                            className="inputblock "  
                            value={user_ID}      
                            onChange={(e) => setUser_IDLocal(e.target.value)}
                       
                            style={{width:'615px'}} 
                            placeholder="กรุณากรอกหมายเลข ID" required />

                       </form>
                       
>>>>>>> 98c94c6b08216e2d687127954901c573f992e98f
                        </center>
                       
                        <button onClick={handleSearch}>Search</button>

                    </div>
                </div>
            </div>
      
        </>
    );
}

export default EnterID;
