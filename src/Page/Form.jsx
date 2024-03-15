import "./Form.css";
import NavBar from "../Components/NavBar";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

import { useParams } from 'react-router-dom';


function Form() {
    const text =  "กรุณาตอบคำถามทั้งหมด \nเพื่อทำการคัดกรองอาการเบื้องต้น";  
    const subtext = "แบบประเมิณต่อไปนี้เป็นการพูดแล้วอัดเสียง"
  
    const { user_ID } = useParams();
    const navigate = useNavigate();     

    const ShowInfo = () => {
        navigate("/ShowInfo")}

        const QuestionForm = () => {
            navigate(`/Questionpage/${user_ID}`)
        }
    


    return(
        <>   
            <NavBar/> 
            <div className="main-bg-form">
            <div className="ArrowList">
                 <GoArrowLeft className="ArrowLeft" onClick={ShowInfo}/>
                 
            </div>
            <div className="HeadtextForm">{text}</div>
            <div className="Subtext">{subtext}</div>
            <div className="Button">
              <Button onClick={QuestionForm} >คลิกที่นี่เพื่อเริ่มต้น</Button>
 
            </div>
            </div>
        </>
    );
}

export default Form;