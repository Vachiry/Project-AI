import LoginForm from './Components/LoginForm'
import Register from './Components/Register';
import Dashboard from './Page/Dashboard';
import Editting from './Page/Editting';
import Layout from './Components/Shared/Layout';
import { BrowserRouter,Routes,Route,} from "react-router-dom";
import { useState } from 'react';

function App() {
     

  return (
          
       <>
 
            <BrowserRouter>
                 
                <Routes>
                  
                    <Route exact path="/" element={<LoginForm />} />
                    <Route exact path="/Register" element={<Register/>} />
                    <Route exact path="/Layout" element={<Layout/>} />
                    <Route exact path="/Dashboard" element={<Dashboard/>} />
                    <Route exact path="/Editting" element={<Editting/>} />
               
               
                    </Routes>
           </BrowserRouter>
    </>
   );
}


export default App
