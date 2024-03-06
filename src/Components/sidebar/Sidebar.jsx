//import React from 'react';
import { Flex, Menu } from 'antd';
import HospitalLogo from '../img/HospitalLogo.png';
import "../Home.css";
import { AppstoreOutlined , FormOutlined, CheckCircleOutlined, DeleteOutlined, InfoCircleOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

function Sidebar () {
  return (
    <>
       <Flex align='center' justify='center'>
        
              <img src={HospitalLogo}  alt="" className='logo' /> 
       
       </Flex>
      
       <Menu mode="inline" 
       //defaultSelectedKeys={['1']} 
       className=" menu-bar " 
       items={[
        {
           key: '1',
           icon: <div style={{ color: '#fff' }}><AppstoreOutlined /></div>,
           label: <div className="changeto">Overview</div>,
           
        },
        {
          key: '2',
          icon: <div style={{ color: '#fff' }}><FormOutlined/></div>,
          label: <div className="changeto">Edit</div>,
          
        },

        {
          key: '3',
          icon: <div style={{ color: '#fff' }}><CheckCircleOutlined/></div>,
          label: <div className="changeto">Check</div>,
        },

        {
          key: '4',
          icon: <div style={{ color: '#fff' }}><DeleteOutlined/></div>,
          label: <div className="changeto">Recycle Bin</div>,
      
        },

        {
           key: '5',
           icon: <div style={{ color: '#fff' }}><InfoCircleOutlined/></div>,
           label: <div className="changeto">Help & Center</div>,
    
        },
        {
            key: '6',
            icon: <div style={{ color: '#fff' }}><SettingOutlined/></div>,
            label: <div className="changeto">Setting</div>,
   
        },
        {
            key: '7',
            icon: <div style={{ color: '#fff' }}><LogoutOutlined /></div>,
            label: <div className="changeto">Logout</div>,
 
         }


      ]}
        
      />
        
        
      
    
    </>
  );
}

export default Sidebar;