//import React from 'react'
import { Avatar, Flex, Typography } from 'antd';
import Search from 'antd/es/input/Search';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MessageOutlined, BellOutlined , UserOutlined  } from '@ant-design/icons';
//import { Typography } from 'react-icons/go';


function HeaderPage( ) {
  


  return (
    <Flex align= "center" justify="space-between" >
         <Typography.Title level={3} type="secondary">
                     Welcome back, 
         </Typography.Title>
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