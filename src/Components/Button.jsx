//import React from "react";
import styled from  "styled-components";

const ButtonComponent = styled.button`
   background-color: #C0BD75;
   color: #162F1F;
   padding: 12px 20px;
   width: 270px;
   height: 100px;
   border-radius: 22px;
   border-color: #5f5f5f;
   border-width: 0px;
   outline: 0;
   box-shadow: 0px 4px 6px gray;
   cursor: pointer;
   transition: ease background-color 350ms;
      &:hover {
         background-color: #a7a44b;
      }
   font-family: "Noto Sans Thai", sans-serif;
   font-size: 28px;
   margin-top:3px;
    
   @media screen and (min-width: 475px) {
      width: 460px;
      height: 160px; 
      font-size: 50px; 
      margin-top: 2opx;}

   @media screen and (min-width: 640px) {
      width: 435px; 
      height: 137px; 
      font-size: 46px; }

   @media screen and (min-width: 968px) {
      width: 400px; 
      height: 120px; 
      font-size: 40px; }

   @media screen and (min-width: 1024px) {
      width: 400px; 
      height: 100px; 
      font-size: 36px; }

   @media screen and (min-width: 1900px) {
      width: 400px; 
      height: 120px; 
      font-size: 42px; }

   @media screen and (min-width: 1980px) {
      width: 450px; 
      height: 150px; 
      font-size: 42px; }
      
`;

const Button = ({type, variant, classname, id, onClick, size, children}) => {
return(
       <ButtonComponent
           type={type ? type : "button" }   
           variant={variant}
           className={classname ? `btn-component ${classname}` : "btn-component" }
           id={id}
           onClick={onClick}
           size={size}
        >
        {children}
        </ButtonComponent>


 );
}

export default Button;