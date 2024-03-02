//import "../App.css";
import NavBar from "../Components/NavBar";
import '../Page/ShowInfo.css';
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useState } from "react";
import axios from 'axios';

function ShowInfo() {
    const Headtext =  "สวัสดีค่ะ";  
    const navigate = useNavigate();           
    const EnterID = () => {
        navigate("/EnterID")
    }     
    
    const [userDetails, setUserDetails] = useState([]);
    const[UserID ]= useState('');

    const getUserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getUserDetails', {
                params: {
                    user_IDs: user_IDs
                }})
                setUserDetails(response.data.data);
                console.log(response.data.data);
                    navigate('/Form');
             

        }catch  (error) {
            console.error('Error fetching user details:', error);
        }
    };
    return (
        <>
        <NavBar/> 
        <div className="main-bg-ShowInfo">
                  <button className="ArrowLeft" onClick={EnterID}><GoArrowLeft /></button>
                  <div className="Headtext">{Headtext}</div>
                  <div className="Container">
                        <div className="auth-wrapper">
                        {userDetails.map(user => (
                            <div key={user.user_IDs}>
                                <h1>User ID: {user.user_IDs}</h1>
                                <h1>Name: {user.user_name}</h1>
                                <h1>Surname: {user.user_surname}</h1>
                                <h1>Sex: {user.user_sex}</h1>
                                <h1>Age: {user.user_age}</h1>
                                     </div>
                                 ))}
                         </div>
                     </div>
                     <div className="Button">
                              <Button onClick={getUserDetails}>ถัดไป</Button>
                     </div>
                 </div>
             
            </>   
  );
}


export default ShowInfo;