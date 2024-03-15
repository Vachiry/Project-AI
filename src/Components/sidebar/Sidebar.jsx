//import React from 'react';
import {  useState } from 'react';
import { Flex, Menu } from 'antd';
import HospitalLogo from '../img/HospitalLogo.png';
import "../Home.css";
import { SidebarData } from '../sidebar/SidebarData';
import { Link } from 'react-router-dom';

export default function Sidebar () {
  
  const [hoveredItems, setHoveredItems] = useState(Array(SidebarData.length).fill(false));

  const handleMouseEnter = (index) => {
    const updatedHoveredItems = [...hoveredItems];
    updatedHoveredItems[index] = true;
    setHoveredItems(updatedHoveredItems);
  };

  const handleMouseLeave = (index) => {
    const updatedHoveredItems = [...hoveredItems];
    updatedHoveredItems[index] = false;
    setHoveredItems(updatedHoveredItems);
  };

  
  return (
    <>
       <Flex align='center' justify='center'>
        
              <img src={HospitalLogo}  alt="" className='logo' /> 
       
       </Flex>


       
       <Menu mode="inline"  className="menu-bar" >
       {SidebarData.map((item, index) => {
       return(
            <Menu.Item  key={index}  style={{ backgroundColor: hoveredItems[index] ? '#2a2a51' : 'transparent',}}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  
                  >
                  <Link to={item.path} className="menu-content-link" >
                    {item.icon}
                    {<h1>{item.label}</h1>}
                    
                  </Link>
            </Menu.Item>)
         })}
     
      </Menu>
    
   
    </>
  );
}

