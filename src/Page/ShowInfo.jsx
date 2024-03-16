<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
//import "../App.css";
import  { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import '../Page/ShowInfo.css';
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
>>>>>>> 98c94c6b08216e2d687127954901c573f992e98f
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { GoArrowLeft } from "react-icons/go";


function ShowInfo({user_IDs}) {
    const [userDetails, setUserDetails] = useState(null);
    const Headtext = "sdasdasd";
    const navigate = useNavigate(); // นำเข้า useNavigate มาใช้งาน

<<<<<<< HEAD
    const EnterID = () => {
        navigate("/EnterID")
    }
=======
function ShowInfo({user_ID}) {
    
    const Headtext =  "สวัสดีค่ะ";  
    
    const navigate = useNavigate();           
    const EnterID = () => {
    navigate("/EnterID")
    }     

    const goToForm = () => {
        navigate(`/Form/${user_ID}`);
        }     
    
    const [userDetails, setUserDetails] = useState(null);
    
    
>>>>>>> 98c94c6b08216e2d687127954901c573f992e98f

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/getUserDetails`, {
<<<<<<< HEAD
                    params: { user_IDs }
=======
                    params: { user_ID }
>>>>>>> 98c94c6b08216e2d687127954901c573f992e98f
                });
                setUserDetails(response.data.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setUserDetails(null);
            }
        };
    
        fetchUserDetails();
<<<<<<< HEAD
    }, [user_IDs]);
=======
    }, [user_ID]);

    
    console.log(userDetails); 
    console.log(user_ID); 
>>>>>>> 98c94c6b08216e2d687127954901c573f992e98f

    
    console.log(userDetails); 
    console.log(user_IDs); 
    
    return (
        <>
<<<<<<< HEAD
            <NavBar /> {/* แสดง NavBar */}
            <div className="main-bg-ShowInfo">
                <button className="ArrowLeft" onClick={EnterID}><GoArrowLeft /></button>
                <div className="Headtext">{Headtext}</div>
                <div className="Container">
                    <div className="auth-wrapper">
                        {/* ตรวจสอบว่า userDetails มีค่าหรือไม่ก่อนทำการ map */}
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
                <div className="Button">
                    <button >ถัดไป</button>
                </div>
            </div>
        </>
    );
=======
        <NavBar/> 
        <div className="main-bg-ShowInfo">
                  <button className="ArrowLeft" onClick={EnterID}><GoArrowLeft /></button>
                  <div className="Headtext">{Headtext}</div>
                  <div className="ContainerShowinfo">
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
                     <div className="Button">
                              <Button onClick={goToForm}>ถัดไป</Button>
                     </div>
                 </div>
             
            </>   
  );
>>>>>>> 98c94c6b08216e2d687127954901c573f992e98f
}
export default ShowInfo;