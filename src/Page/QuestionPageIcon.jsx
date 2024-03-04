//import React from 'react'
import './questionPageIcon.css';
import NavBar from '../Components/NavBar'
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
const QuestionPageIcon = () => {

    const navigate = useNavigate();           
    const goToForm = () => {
    navigate("/Form")
    }     
  return (
    <div>
         <NavBar/>
         <div className="main-bg-q">
                  <button className="ArrowLeft" onClick={goToForm}><GoArrowLeft /></button>
         </div>
    </div>
  )
}

export default QuestionPageIcon
