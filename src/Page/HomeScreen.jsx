import "./HomeScreen.css";
import NavBar from "../Components/NavBar";
import Button from "../Components/Button";
import {  useNavigate } from "react-router-dom";

function HomeScreen() {
  const text =  "ยินดีต้อนรับ \n ระบบคัดกรองอาการเบื้องต้น";  
   
  const navigate = useNavigate();           
  const EnterID = () => {
    navigate("/EnterID")
  }
  
  

  return (
    <>
      <NavBar/>    
     <div className="main-bg-home">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="Homeheadtext">{text}</h1>
          <div className="Button">
                  
                <Button className='Button' onClick={EnterID}>คลิกที่นี่เพื่อเริ่มต้น</Button>
        
          </div>
        </div>
        </div>
    </>
  );
}


export default HomeScreen;
