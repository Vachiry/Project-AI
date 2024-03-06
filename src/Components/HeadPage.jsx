import { Button, Layout } from 'antd';
import Sidebar from "../Components/sidebar/Sidebar";
import "./Home.css";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import HeaderPage from "../Components/header/HeaderPage";
//import { Outlet  } from 'react-router-dom';
import {  useState } from "react";
import Dashboard from '../Page/Dashboard';
//import Dashboard from '../Page/Dashboard';
//import Editpage from '../Page/Editpage';
const { Sider, Header} = Layout;
//import App from '../App';
function HeadPage() {
     {/* 
  const [AdminDetail, setAdminDetail] = useState(null);

  useEffect(() => {
    const fetchAdminDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/getAdmindetail`, {
          params: { username },
        });
        setAdminDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
        setAdminDetail(null);
      }
    };

    fetchAdminDetail();
  }, [username]);

  console.log(setAdminDetail);
  console.log(username);*/}
  
  const [collapsed, setCollapsed] = useState(false); 

  



  return (
    <>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" trigger={null} collapsible collapsed={collapsed} className="sider">
        
        <Sidebar />
         
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
         
          className="triger-btn"
        />
        
      </Sider> 
    
       
      <Layout className="site-layout">

         <Header className="header">
             {/* 
              {AdminDetail && (
               <>
              <h1>{AdminDetail.username}</h1>
              </>
              )} */}
            <HeaderPage />
         </Header>
         <div className ="content">
          
         </div>
      </Layout> 
     
    </Layout> 

    
    </>
  );
}

export default HeadPage;