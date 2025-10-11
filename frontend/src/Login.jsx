

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useDispatch } from 'react-redux';
import { loginSuccess, setIsLoggedIn } from './redux/actions'; // Import loginSuccess and setIsLoggedIn actions
import Hide from "./Pages/Images/Hide-password.png";
import { BASE_URL } from './Config';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { emailId, password });
      const { token } = response.data; // Extract token from response
      setMessage("Login Successfully");
      dispatch(loginSuccess(emailId, token)); // Dispatching the action with token
      dispatch(setIsLoggedIn(true)); // Set isLoggedIn to true
      localStorage.setItem('token', token);
      localStorage.setItem('emailId', emailId);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setMessage("Invalid Email or Password");
      if (error.response) {
        setMessage("Login Failed. Please check your credentials.");
      } else if (error.request) {
        setMessage("Network error. Please try again later.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className='login-body'>
      <center>
        <h1>Allsmart Agritech Finance Manager</h1>
        <div className="login-container">
          <h2>Customer Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              Email:
              <input
                id='loginemailinput'
                type="email"
                value={emailId}
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <div className="password-input-container">
                <input
                  id='loginpwdinput'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : <img src={Hide} id='hide' alt='hide' />}
                </span>
              </div>
            </label>
            <br />
            <button id='login' type="submit">Login</button>
            <br />
          </form>

          <div className="login-links">
            <button id='login' onClick={() => navigate('/forgot-pwd')}>Forgot Password</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id='login' onClick={() => navigate('/signup')}>Go to Register</button>
          </div>
          <br />

        </div>
        <p id='admingo'>Go to Admin Panel :&nbsp;&nbsp;
          <Link id='admingo' to='/admin'>Click Here</Link></p>
        {message && <p className="message" type="message">{message}</p>}
      </center>
    </div>
  );
};

export default Login;



/*


import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/actions'; // Import loginSuccess action
import { setIsLoggedIn } from './redux/actions'; // Import setIsLoggedIn action
import Hide from "./Pages/Images/Hide-password.png";
import { BASE_URL } from './Config';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { emailId, password });
      const { token } = response.data; // Extract token from response
      setMessage("Login Successfully");
      dispatch(loginSuccess(emailId, token)); // Dispatching the action with token
      dispatch(setIsLoggedIn(true)); // Set isLoggedIn to true
      localStorage.setItem('token', token);
      localStorage.setItem('emailId', emailId);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setMessage("Invalid Email or Password");
      if (error.response) {
        setMessage("Login Failed. Please check your credentials.");
      } else if (error.request) {
        setMessage("Network error. Please try again later.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className='login-body'>
      <center>
        <h1>Allsmart Agritech Finance Manager</h1>
        <div className="login-container">
          <h2>Customer Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              Email:
              <input
                id='loginemailinput'
                type="email"
                value={emailId}
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <div className="password-input-container">
                <input
                  id='loginpwdinput'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : <img src={Hide} id='hide' alt='hide' />}
                </span>
              </div>
            </label>
            <br />
            <button id='login' type="submit">Login</button>
            <br />
          </form>

          <div className="login-links">
            <button id='login' onClick={() => navigate('/forgot-pwd')}>Forgot Password</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id='login' onClick={() => navigate('/signup')}>Go to Register</button>
          </div>
          <br />

        </div>
        <p id='admingo'>Go to Admin Panel :&nbsp;&nbsp;
          <Link id='admingo' to='/admin'>Click Here</Link></p>
        {message && <p className="message" type="message">{message}</p>}
      </center>
    </div>
  );
};

export default Login;


/*

// Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/actions';
import Hide from "./Pages/Images/Hide-password.png";
import { BASE_URL } from './Config';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { emailId, password });
      const { token } = response.data; // Extract token from response
      setMessage("Login Successfully");
      dispatch(loginSuccess(emailId, token)); // Dispatching the action with token
      localStorage.setItem('token', token);
      localStorage.setItem('emailId', emailId);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setMessage("Invalid Email or Password");
      if (error.response) {
        setMessage("Login Failed. Please check your credentials.");
      } else if (error.request) {
        setMessage("Network error. Please try again later.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className='login-body'>
      <center>
        <h1>Allsmart Agritech Finance Manager</h1>
        <div className="login-container">
          <h2>Customer Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              Email:
              <input
                id='loginemailinput'
                type="email"
                value={emailId}
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <div className="password-input-container">
                <input
                  id='loginpwdinput'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : <img src={Hide} id='hide' alt='hide' />}
                </span>
              </div>
            </label>
            <br />
            <button id='login' type="submit">Login</button>
            <br />
          </form>

          <div className="login-links">
            <button id='login' onClick={() => navigate('/forgot-pwd')}>Forgot Password</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id='login' onClick={() => navigate('/signup')}>Go to Register</button>
          </div>
          <br />

        </div>
        <p id='admingo'>Go to Admin Panel :&nbsp;&nbsp;
          <Link id='admingo' to='/admin'>Click Here</Link></p>
        {message && <p className="message" type="message">{message}</p>}
      </center>
    </div>
  );
};

export default Login;




/*

*/