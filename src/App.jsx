//import "./App.css";
import { useState } from 'react';
import LoginForm from './Components/LoginForm'
import Editting from './Page/Editting'
import Register from "./Components/Register"
import HomeScreen from "./Page/HomeScreen";
import EnterID from "./Page/EnterID";
import Form from "./Page/Form";
import ShowInfo from "./Page/ShowInfo";
import Questionpage from './Page/Questionpage';
import TestAudio from './Page/TestAudio';
import QuestionPageIcon from './Page/QuestionPageIcon';
import { BrowserRouter,Routes,Route } from "react-router-dom";
//import { BrowserRouter ,  Route,Routes } from 'react-router-dom';
//import React from 'react';
import Dashboard from './Page/Dashboard';
import HeadPage from './Components/HeadPage';
import Checkpage from './Page/Checkpage';
import Editpage from './Page/Editpage';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Recyclepage from './Page/Recyclepage';
import RouteWithSidebar from './Page/RouteWithSidebar';
//import Sidebar from './Components/sidebar/Sidebar';




function App() {
    const [user_ID, setUser_ID] = useState("");
    //const [username, setAdminName] = useState("");
   

  return (
    
    <>
    <BrowserRouter>
            
            <Routes>
                    <Route path="/HeadPage" element={<HeadPage  />} />
                    <Route path="/Editpage" element={<RouteWithSidebar element={<Editpage />} />} />
                    <Route path="/Checkpage" element={<RouteWithSidebar  element={<Checkpage />} />} />
                    <Route path="/Dashboard"  element={<RouteWithSidebar  element={<Dashboard />} />}/>
                    <Route path="/Recyclepage" element={<RouteWithSidebar  element={<Recyclepage />} />} />
                     
                    <Route exact path="/Login" element={<LoginForm  />} />
                    <Route exact path="/Register" element={<Register/>} />
                   
                    <Route exact path="/Dashboard" element={<Dashboard/>} />
                    <Route exact path="/Editting" element={<Editting/>} />
                    
                    <Route exact path="/HomeScreen" element={<HomeScreen />} />
                    <Route exact path="/EnterID" element={<EnterID setUser_ID={setUser_ID} />} />
                    <Route exact path="/Form" element={<Form/>} />
                    <Route exact path="/ShowInfo" element={<ShowInfo user_ID={user_ID} />} />
                    <Route exact path="/Questionpage" element={<Questionpage/>} />
                    <Route exact path="/TestAudio" element={<TestAudio/>} />
                    <Route exact path="/QuestionPageIcon" element={<QuestionPageIcon/>} />
                  
                      
                    </Routes> 
          
        </BrowserRouter>       
    </>
   );
}

export default App;