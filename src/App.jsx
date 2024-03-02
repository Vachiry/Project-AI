//import "./App.css";
import LoginForm from './Components/LoginForm'
import Dashboard from './Page/Dashboard'
import Editting from './Page/Editting'
import HeadPage from './Components/HeadPage';
import Register from "./Components/Register"
import HomeScreen from "./Page/HomeScreen";
import EnterID from "./Page/EnterID";
import Form from "./Page/Form";
import ShowInfo from "./Page/ShowInfo";
//import QueestionForm from "./page/QueestionForm";
import { BrowserRouter,Routes,Route,} from "react-router-dom";
import '@fortawesome/fontawesome-svg-core/styles.css';

function App() {
 

  return (
    <>
            <BrowserRouter>
                <Routes>
                  
                    <Route exact path="/Login" element={<LoginForm />} />
                    <Route exact path="/Register" element={<Register/>} />
                    <Route exact path="/HeadPage" element={<HeadPage/>} />
                    <Route exact path="/Dashboard" element={<Dashboard/>} />
                    <Route exact path="/Editting" element={<Editting/>} />
                    
                    <Route exact path="/HomeScreen" element={<HomeScreen />} />
                    <Route exact path="/EnterID" element={<EnterID/>} />
                    <Route exact path="/Form" element={<Form/>} />
                    <Route exact path="/ShowInfo" element={<ShowInfo/>} />
                     {/* 
                    <Route exact path="/QueestionForm" element={<QueestionForm/>} />
                    */}


                </Routes>
           </BrowserRouter>
    </>
   );
}

export default App;