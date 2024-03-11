//import React from 'react'
import './Editpage.css';
//import React from 'react';
//import { Pagination } from 'antd';
import { Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space } from 'antd';


const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};
const items = [
  {
    label: 'question',
    key: '1',
    
  },
  {
    label: 'choice',
    key: '2',
    
  }
];

const menuProps = {
  items,
  onClick: handleMenuClick,}

const Editpage = () => {
  return (
    
      <>  
         <div className ="Fonthead"><h1>Edit</h1>
                        <div className = "subtext"> 
                            Home / Edit
                        </div>
         </div>
         <div className="divider"></div>
         <Card style={{height: 340 ,padding:'30px'}} className='card'>
          <div className='space'>
         <Space wrap >
    
            <Dropdown menu={menuProps}>
            <Button>
                <Space>
                    Button
                    <DownOutlined />
                </Space>
             </Button>
            </Dropdown>
   
            </Space>
            </div>
         </Card>
      
      
         </>
          
      
   );
}

export default Editpage
