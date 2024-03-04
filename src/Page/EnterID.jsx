import './EnterID.css';
// import Button from '../Components/Button';
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";

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
    
    return(
        <>
            <NavBar/>
            <div className="main-bg-EnterID">
                <button className="ArrowLeft" onClick={goToHomeScreen} ><GoArrowLeft /></button>
                <div className =" create">
                    <div className="Headtext">{Headtext}
                    <br/>
                        <center>
                          <form>
                            <input
                              type="text"
                              placeholder="Enter user ID"
                              value={user_IDs}
                              onChange={(e) => setUserIDsLocal(e.target.value)}
                            />
                          </form>
                        </center>
                       
                        <button onClick={handleSearch}>Search</button>

                    </div>
                </div>
            </div>
      
        </>
    );
}

export default EnterID;
