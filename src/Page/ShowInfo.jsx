import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { GoArrowLeft } from "react-icons/go";


function ShowInfo({user_IDs}) {
    const [userDetails, setUserDetails] = useState(null);
    const Headtext = "sdasdasd";
    const navigate = useNavigate(); // นำเข้า useNavigate มาใช้งาน

    const EnterID = () => {
        navigate("/EnterID")
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/getUserDetails`, {
                    params: { user_IDs }
                });
                setUserDetails(response.data.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setUserDetails(null);
            }
        };
    
        fetchUserDetails();
    }, [user_IDs]);

    
    console.log(userDetails); 
    console.log(user_IDs); 
    
    return (
        <>
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
}
export default ShowInfo;