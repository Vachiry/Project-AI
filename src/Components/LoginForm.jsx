import  { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add additional logic here if needed
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  };

  const LogInAdmin = () => {
    if (email.length === 0 || password.length === 0 || username.length === 0) {
      alert("Please fill in all required fields!");
    } else {
      axios
        .post('http://127.0.0.1:5000/LogIn', {
          email: email,
          username: username,
          password: password,
        }, { withCredentials: true })
        .then(function (response) {
          console.log(response);
       
          
          navigate('/HeadPage');
        })
        .catch(function (error) {
          console.log(error, 'error');
          if (error.response && error.response.status === 401) {
            alert("Invalid credentials");
          }
        });
    }
  };

  return (
    <>
      <div className='main-bg-login'>
        <div className='wrapper'>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='input-box'>
              <input
                type='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
                required
              />
              <FaUser className='icon' />
            </div>
            <div className='input-box'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
              />
              <FaUser className='icon' />
            </div>
            <div className='input-box'>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
              />
              <FaLock
                className={`icon ${isPasswordVisible ? 'visible' : ''}`}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className='remember-forgot'>
              <label>
                <input type='checkbox' />Remember me
              </label>
              <a href='#sadsa'>Forgot Password</a>
            </div>

            <button type='button' onClick={LogInAdmin}>
              Login
            </button>

            <div className='register-link'>
              <p>
                Don't have an account? <a href='/Register'>Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;