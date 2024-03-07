import "./Form.css";
import NavBar from "../Components/NavBar";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { FaThList } from "react-icons/fa";


function Form() {
    const text =  "กรุณาตอบคำถามทั้งหมด \nเพื่อทำการคัดกรองอาการเบื้องต้น";  
    const subtext = "แบบประเมิณต่อไปนี้เป็นการพูดแล้วอัดเสียง"
    const subtext2 = "หากท่านไม่ต้องการอัดเสียง กรุณาคลิกที่"
    const subtext3 = "เพื่อทำแบบประเมิณอาการเบื้องต้น"

    const navigate = useNavigate();     

    const ShowInfo = () => {
        navigate("/ShowInfo")}

    const QuestionForm = () => {
        navigate("/Questionpage")
    }

    const goToQuestionIcon = () => {
        navigate("/QuestionPageIcon")}

    return(
        <>   
            <NavBar/> 
            <div className="main-bg-form">
                <div className="ArrowList">
                    <GoArrowLeft className="ArrowLeft" onClick={ShowInfo}/>
                    <FaThList className="BoxList" onClick={goToQuestionIcon}/>
                </div>
                <div className="data-section">
                    <div className="HeadtextForm">{text}</div>
                    <div className="Subtext">{subtext}</div>
                    <div className="Button">
                    <Button onClick={QuestionForm} >คลิกที่นี่เพื่อเริ่มต้น</Button>
                    <div className="TextBox">
                    <div className="Subtext">{subtext2} </div>
                    <FaThList className="BoxListText"/>
                    </div>         
                <div className="Subtext">{subtext3}</div>
                </div>
                
                </div>
            </div> 
        </>
    );
}

export default Form;