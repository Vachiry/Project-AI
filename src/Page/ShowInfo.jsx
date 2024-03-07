//import "../App.css";
import  { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import '../Page/ShowInfo.css';
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import axios from 'axios';

function ShowInfo({user_ID}) {
    
    const Headtext =  "สวัสดีค่ะ";  
    
    const navigate = useNavigate();           
    const EnterID = () => {
    navigate("/EnterID")
    }     

    const goToForm = () => {
        navigate("/Form")
        }     
    
    const [userDetails, setUserDetails] = useState(null);
    
    

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/getUserDetails`, {
                    params: { user_ID }
                });
                setUserDetails(response.data.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setUserDetails(null);
            }
        };
    
        fetchUserDetails();
    }, [user_ID]);

    
    console.log(userDetails); 
    console.log(user_ID); 

    return (
        <>
        <NavBar/> 
        <div className="main-bg-ShowInfo">
                  <button className="ArrowLeft" onClick={EnterID}><GoArrowLeft /></button>
                  <div className="Headtext">{Headtext}</div>
                  <div className="Containers">
                    <div className="UserDetail-section">
                        <div className="auth-wrapper">
                            {userDetails && (
                                <>
                                    <h1>User ID: {userDetails.user_ID}</h1>
                                    <h1>Name: {userDetails.user_name}</h1>
                                    <h1>Surname: {userDetails.user_surname}</h1>
                                    <h1>Sex: {userDetails.user_sex}</h1>
                                    <h1>Age: {userDetails.user_age}</h1>
                                </>
                                    )}
                        </div>
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