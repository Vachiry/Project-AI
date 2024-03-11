//import "./App.css";
import { useState } from 'react';
import LoginForm from './Components/LoginForm'
import Dashboard from './Page/Dashboard'
import Editting from './Page/Editting'
import HeadPage from './Components/HeadPage';
import Register from "./Components/Register"
import HomeScreen from "./Page/HomeScreen";
import EnterID from "./Page/EnterID";
import Form from "./Page/Form";
import ShowInfo from "./Page/ShowInfo";
import Questionpage from './Page/Questionpage';
import TestAudio from './Page/TestAudio';
import QuestionPageIcon from './Page/QuestionPageIcon';
import { BrowserRouter,Routes,Route,} from "react-router-dom";
import '@fortawesome/fontawesome-svg-core/styles.css';

function App() {
    const [user_ID, setUser_ID] = useState("");
    const [username, setAdminName] = useState("");

  return (
    <>
            <BrowserRouter>
                <Routes>
                  
                    <Route exact path="/Login" element={<LoginForm setUsername={setAdminName} />} />
                    <Route exact path="/Register" element={<Register/>} />
                    <Route exact path="/HeadPage" element={<HeadPage username={username} />} />
                    <Route exact path="/Dashboard" element={<Dashboard/>} />
                    <Route exact path="/Editting" element={<Editting/>} />
                    
                    <Route exact path="/HomeScreen" element={<HomeScreen />} />
                    <Route path="/EnterID" element={<EnterID setUser_ID={setUser_ID} />} />
                    <Route exact path="/Form/:user_ID" element={<Form/>} />
                    <Route path="/ShowInfo" element={<ShowInfo user_ID={user_ID} />} />
                    <Route exact path="/Questionpage/:user_ID" element={<Questionpage/>} />
                    <Route exact path="/TestAudio" element={<TestAudio/>} />
                   
                    <Route exact path="/QuestionPageIcon" element={<QuestionPageIcon/>} />
                  


                </Routes>
           </BrowserRouter>
    </>
   );
}

export default App;