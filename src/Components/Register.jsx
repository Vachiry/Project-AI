import './Register.css'
import  { useState } from 'react';
import { useNavigate,  } from "react-router-dom";
import axios from 'axios';
//import { GoArrowLeft } from "react-icons/go";
const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSername] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [admin_ID, setAdmin_ID] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        // You can add additional logic here if needed
      };
      
    
      const SignupAdmin = () => {
        if (name.length === 0 || surname.length === 0 || admin_ID.length === 0 || email.length === 0 || password.length === 0 || username.length === 0) {
          alert("Please fill in all required fields!");
        } else {
          axios
            .post('http://127.0.0.1:5000/Register', {
                name:name,
                surname:surname,
                email: email,
                username: username,
                password: password,
                confirmpassword: confirmpassword,
                admin_ID: admin_ID
            }, { withCredentials: true })
            .then(function (response) {
              console.log(response);
           
              
              navigate('/Login');
            })
            .catch(function (error) {
              console.log(error, 'error');
              if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
              }
            });
        }
      };


    return(

        
     
        <div className='main-bg-regis'>

            <div className='wrapper '>
            <form onSubmit={handleSubmit}>
                 <h1>Sign Up</h1>
                 <div className='input-box'>
                         <input
                          type={'admin_ID'}
                          value={admin_ID}
                          onChange={(e) => setAdmin_ID(e.target.value)}
                          placeholder='ID card'
                          required
                 />
                 </div>
                 <div className='input-box'>
                       <input
                        type='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        required
                 />
                 </div>
                 <div className='input-box'>
                       <input
                        type='surname'
                        value={surname}
                        onChange={(e) => setSername(e.target.value)}
                        placeholder='Surname'
                        required
                 />
                 </div>
                 <div className='input-box'>
                        <input
                         type='username'
                         value={username}
                         onChange={(e) => setUsername(e.target.value)}
                         placeholder='Username'
                         required
                  />
                  </div>
                 <div className='input-box'>
                         <input
                          type='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='Email'
                          required
                  />
                  </div>
                 <div className='input-box'>
                         <input
                          type={'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder='Password'
                          required
                 />
                 </div>
                 <div className='input-box'>
                       <input
                        type='confirmpassword'
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm password'
                        required
                 />
                 </div>
                 <button type='button' onClick={SignupAdmin}>Sign Up</button>
               
               
            </form>
            </div>
        </div>
      

    )

    };

    export default Register;