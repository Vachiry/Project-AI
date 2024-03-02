//import React from 'react'
import { Avatar, Flex } from 'antd';
import Search from 'antd/es/input/Search';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MessageOutlined, BellOutlined , UserOutlined  } from '@ant-design/icons';

function HeaderPage() {
  return (
    <Flex align= "center" justify="space-between" >
        
        <Flex align="center" gap="2rem">
            <Search placeholder="Search Dashboard" allowClear />

            <Flex align="center" gap="17px">


               <MessageOutlined className='header-icon'/>
               <BellOutlined className='header-icon'/> 
               <Avatar icon={<UserOutlined style={{ color: 'black' }} />} />
            </Flex>
        </Flex> 
         









    </Flex>
  )
}

export default HeaderPage;