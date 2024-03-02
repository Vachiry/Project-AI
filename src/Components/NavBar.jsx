//import React from "react";
import "./NavBar.css";
import HospitalLogo from '../Image/HospitalLogo.png';
import { useNavigate } from 'react-router-dom';
function NavBar() {
      const navigate = useNavigate();
      const navtext =  "โรงพยาบาลวชิรพัฒน์ \nWachiraphat Hospital";   

      const goToHomeScreen = () => {
        try {
            navigate("/HomeScreen");
        } catch (error) {
            console.error("Error navigating to HomeScreen:", error);
        }
    }
    
    return(
       
        <>
           
           <div className="navbar">
          
            
                <div className="nav-container">   
                <img src={HospitalLogo}  onClick={goToHomeScreen} alt="" className="logo"/>     
                           
                <div className="nav-headtext">{navtext}</div>        
                            
                </div>
                

           </div>
        </>




    );
}

export default NavBar;