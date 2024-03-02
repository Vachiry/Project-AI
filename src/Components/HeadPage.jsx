import  { useState } from "react";
import { Button,Layout } from 'antd';
import Sidebar from "../Components/sidebar/Sidebar";
import "./Home.css";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import HeaderPage from "../Components/header/HeaderPage";
import PageTitle from "../Page/PageTitle";
const { Sider, Header} = Layout;
function HeadPage() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        
        <Layout>
             <Sider theme="dark" trigger={null} collapsible collapsed={collapsed} className="sider">
             
        
             <Sidebar/>
            
               <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
                onClick={() => setCollapsed(!collapsed)}
                className="triger-btn"
                />
             
             
             </Sider>
             
             <Layout>
             
                 <Header className="header">
                     <HeaderPage/>
                 </Header>
                 
                 <div className="main-Dashboard">
                      <PageTitle page="Dashboard" />


                 </div>
             </Layout>
        </Layout>
         
       
        

    );
}

export default HeadPage;