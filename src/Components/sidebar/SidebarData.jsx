import{AppstoreOutlined, 
    FormOutlined, 
    CheckCircleOutlined, 
    DeleteOutlined, 
    InfoCircleOutlined, 
    SettingOutlined, 
    LogoutOutlined } from '@ant-design/icons';
import '../Home.css';


    export const SidebarData = [
       
    {
           key: '1',
           icon: <div style={{ color: '#fff' }}><AppstoreOutlined /></div>,
           label: <div className="changeto">Dashboard</div>,
           path:'/Dashboard'
     },
     {
           key: '2',
           icon: <div style={{ color: '#fff' }}><FormOutlined/></div>,
           label: <div className="changeto">Edit</div>,
           path:'/Editpage'


     },

     {
            key: '3',
            icon: <div style={{ color: '#fff' }}><CheckCircleOutlined/></div>,
            label: <div className="changeto">Check</div>,
            path:'/Checkpage'

      },

      {
            key: '4',
            icon: <div style={{ color: '#fff' }}><DeleteOutlined/></div>,
            label: <div className="changeto">Recycle Bin</div>,
            path:'/Recyclepage'


       },
       {
            key: '5',
            icon: <div style={{ color: '#fff' }}><LogoutOutlined /></div>,
            label: <div className="changeto">Logout</div>,


  }


]
      {/*
       {
             key: '5',
             icon: <div style={{ color: '#fff' }}><InfoCircleOutlined/></div>,
             label: <div className="changeto">Help & Center</div>,
             path:'/Help'


      },
      {
              key: '6',
              icon: <div style={{ color: '#fff' }}><SettingOutlined/></div>,
              label: <div className="changeto">Setting</div>,
              path:'/Setting'

      }, */}
    