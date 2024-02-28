import React from "react";
import { Outlet } from 'react-router-dom';

function Layout() {


    return (
       <>
           <div className="bg-sky-100"> sidebar </div>
           <div className="bg-teal-200"> Header </div>
          
           <div> {<Outlet/>} </div>


           
        </>

    );
}

export default Layout;