import React from 'react'
import  './PageTitle.css';
import '../Components/Home.css';


function PageTitle ({ page }) {
    return (
        <>
           <div className='pagetitle'>
                <h1>{page}</h1>
           
            </div>
            <div className='title'>
                <h1>Home / Overview</h1>
             </div>
        </>
      )
    }



    export default PageTitle;
