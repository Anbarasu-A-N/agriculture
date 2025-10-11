

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Hide from "./Images/Hide-password.png";
import './AdminLogin.css';
import { useDispatch } from 'react-redux';
import { loginSuccess, setIsLoggedIn } from '../redux/actions.js'; // Import loginSuccess and setIsLoggedIn actions
import { BASE_URL } from '../Config.jsx';

const AdminLogin = () => {
  const [emailId, setEmailId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { emailId, password });
      const { token } = response.data; // Extract token from response
      
      dispatch(loginSuccess(emailId, token)); // Dispatching the action with token
      dispatch(setIsLoggedIn(true)); // Set isLoggedIn to true
      localStorage.setItem('token', token);
      localStorage.setItem('emailId', emailId);
      
      // Check if the email ID is "allsmart.org@gmail.com"
      if (emailId === "allsmart.org@gmail.com") {
        setAdminMessage("Admin Access Granted!!!");
        setTimeout(() => {
          navigate('/adminhome');
        }, 3000); 
      } else {
        setAdminMessage("Use User Login Tab!!!");
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setAdminMessage("Admin login failed. Please check your credentials.");
      if (error.response) {
        console.log("Server error response:", error.response);
        setAdminMessage("Login Failed. Please check your credentials.");
      } else if (error.request) {
        console.log("Network error:", error.request);
        setAdminMessage("Network error. Please try again later.");
      } else {
        console.log("Other error:", error.message);
        setAdminMessage("An error occurred. Please try again later.");
      }
      // Clear the error message after 5 seconds
      setTimeout(() => {
        setAdminMessage('');
      }, 10000);
    }
  };

  return (
    <div className='body'>
      <center>
        <h1 id='adminlogin'>Allsmart Agritech Finance Manager</h1>
        <div className='admin-login-container'>
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminLogin}>
            <label>
              Admin Username:
              <input
                type="text"
                id='admininput'
                value={emailId}
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <br />
            <label>
              Admin Password:
              <div className="password-input-container">
                <input
                  id='adminpwdinput'
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
            <button id='adminlogin' type="submit">Login as Admin</button>
            <br />
          </form>

          <div className="login-links">
            <button id='adminlogin' onClick={() => navigate('/login')}>Go To Login</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id='adminlogin' onClick={() => navigate('/signup')}>Go to Register</button>
          </div>
          <br />
        </div>

        {adminMessage && <p className="admin-message" type="message">{adminMessage}</p>}
      </center>
    </div>
  );
};

export default AdminLogin;










/*

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Hide from "./Images/Hide-password.png";
import './AdminLogin.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions.js';
import { BASE_URL } from '../Config.jsx';

const AdminLogin = () => {
  const [emailId, setEmailId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { emailId, password });
      const { token } = response.data; // Extract token from response
      
      dispatch(loginSuccess(emailId, token)); // Dispatching the action with token
      localStorage.setItem('token', token);
      localStorage.setItem('emailId', emailId);
      
      // Check if the email ID is "allsmart.org@gmail.com"
      if (emailId === "allsmart.org@gmail.com") {
        setAdminMessage("Admin Access Granted!!!");
        setTimeout(() => {
          navigate('/adminhome');
        }, 3000); 
      } else {
        setAdminMessage("Use User Login Tab!!!");
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setAdminMessage("Admin login failed. Please check your credentials.");
      if (error.response) {
        console.log("Server error response:", error.response);
        setAdminMessage("Login Failed. Please check your credentials.");
      } else if (error.request) {
        console.log("Network error:", error.request);
        setAdminMessage("Network error. Please try again later.");
      } else {
        console.log("Other error:", error.message);
        setAdminMessage("An error occurred. Please try again later.");
      }
      // Clear the error message after 5 seconds
      setTimeout(() => {
        setAdminMessage('');
      }, 10000);
    }
  };

  return (
    <div className='body'>
      <center>
        <h1 id='adminlogin'>Allsmart Agritech Finance Manager</h1>
        <div className='admin-login-container'>
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminLogin}>
            <label>
              Admin Username:
              <input
                type="text"
                id='admininput'
                value={emailId}
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <br />
            <label>
              Admin Password:
              <div className="password-input-container">
                <input
                  id='adminpwdinput'
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
            <button id='adminlogin' type="submit">Login as Admin</button>
            <br />
          </form>

          <div className="login-links">
            <button id='adminlogin' onClick={() => navigate('/login')}>Go To Login</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id='adminlogin' onClick={() => navigate('/signup')}>Go to Register</button>
          </div>
          <br />
        </div>

        {adminMessage && <p className="admin-message" type="message">{adminMessage}</p>}
      </center>
    </div>
  );
};

export default AdminLogin;






/*

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Hide from "./Images/Hide-password.png";
import './AdminLogin.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions.js';
import { BASE_URL } from '../Config.jsx';

const AdminLogin = () => {
  const [emailId, setEmailId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { emailId, password });
      const { token } = response.data; // Extract token from response
      setAdminMessage("Login Successfully");
      dispatch(loginSuccess(emailId, token)); // Dispatching the action with token
      localStorage.setItem('token', token);
      localStorage.setItem('emailId', emailId);
      setTimeout(() => {
        navigate('/adminhome');
      }, 3000);
    } catch (error) {
      console.error("Admin login error:", error);
      setAdminMessage("Admin login failed. Please check your credentials.");
      if (error.response) {
        console.log("Server error response:", error.response);
        setAdminMessage("Login Failed. Please check your credentials.");
      } else if (error.request) {
        console.log("Network error:", error.request);
        setAdminMessage("Network error. Please try again later.");
      } else {
        console.log("Other error:", error.message);
        setAdminMessage("An error occurred. Please try again later.");
      }
      // Clear the error message after 5 seconds
      setTimeout(() => {
        setAdminMessage('');
      }, 10000);
    }
  };

  return (
    <div className='body'>
      <center>
        <h1 id='adminlogin'>Allsmart Agritech Finance Manager</h1>
        <div className='admin-login-container'>
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminLogin}>
            <label>
              Admin Username:
              <input
                type="text"
                id='admininput'
                value={emailId}
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <br />
            <label>
              Admin Password:
              <div className="password-input-container">
                <input
                  id='adminpwdinput'
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
            <button id='adminlogin' type="submit">Login as Admin</button>
            <br />
          </form>

          <div className="login-links">
            <button id='adminlogin' onClick={() => navigate('/login')}>Go To Login</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id='adminlogin' onClick={() => navigate('/signup')}>Go to Register</button>
          </div>
          <br />
        </div>

        {adminMessage && <p className="admin-message" type="message">{adminMessage}</p>}
      </center>
    </div>
  );
};

export default AdminLogin;




/*
*/