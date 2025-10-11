
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Hide from "./Pages/Images/Hide-password.png";
import { BASE_URL } from './Config';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        firstName,
        lastName,
        gender,
        age,
        emailId,
        password,
        countryCode,
        mobile,
      });
      if (response.data && response.data.message) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage('An error occurred during registration.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred during registration.');
      }
    }
  };

  return (
    <div className='register-body'>
      <center>
        <h1>Allsmart Agritech Finance Manager</h1>
        <div className="register-container">
          <h2>Customer Register</h2>
          <form onSubmit={handleRegister}>
            <label>
              First Name:&nbsp;&nbsp;
              <input
                type="text"
                value={firstName}
                id='register'
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                value={lastName}
                id='register'
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              Gender:
              <select
                value={gender}
                id='register'
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              Age: 
              <input
                type="number"
                value={age}
                id='register'
                required
                onChange={(e) => setAge(e.target.value)}
                autoComplete="off"
              />
            </label>
            <label>
              Email ID:
              <input
                type="email"
                value={emailId}
                id='register'
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label>
              Password:
              <div className="registerpassword-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  id='register1'
                  minLength={8}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={`registerpassword-toggle-icon ${showPassword ? 'visible' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : <img src={Hide} id='register' alt='hide' />}
                </span>
              </div>
            </label>
            <label> 
              Mobile:
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                style={{width:'110px', padding:'1px', marginLeft:42}}
                required
              >
                <option value="">Country Code</option>
                <option value="+1">+1 (USA)</option>
                <option value="+7">+7 (Russia)</option>
                <option value="+91">+91 (India)</option>
                <option value="+234">+234 (Nigeria)</option>
                <option value="+971">+971 (Dubai)</option>
              </select>
              <input
                type="tel"
                value={mobile}
                id='register'
                style={{width:'140px'}}
                minLength={10}
                maxLength={10}
                required
                onChange={(e) => setMobile(e.target.value)}
              />
            </label>
            <div className="login-links">
              <button id='register' type="submit">Register</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button id='register' onClick={() => navigate('/login')}>Login</button>
            </div>
          </form>
        </div>
        {message && <p className="message" type="message">{message}</p>}
      </center>
    </div>
  );
};

export default SignUp;



/*

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Hide from "./Pages/Images/Hide-password.png";
import { BASE_URL } from './Config';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        firstName,
        lastName,
        gender,
        age,
        emailId,
        password,
        countryCode,
        mobile,
      });
      if (response.data && response.data.message) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage('An error occurred during registration.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred during registration.');
      }
    }
  };

  return (
    <div className='register-body'>
      <center>
        <h1>Allsmart Agritech Finance Manager</h1>
        <div className="register-container">
          <h2>Customer Register</h2>
          <form onSubmit={handleRegister}>
            <label>
              First Name:&nbsp;&nbsp;
              <input
                type="text"
                value={firstName}
                id='register'
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                value={lastName}
                id='register'
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              Gender:
              <select
                value={gender}
                id='register'
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              Age: 
              <input
                type="number"
                value={age}
                id='register'
                required
                onChange={(e) => setAge(e.target.value)}
                autoComplete="off"
              />
            </label>
            <label>
              Email ID:
              <input
                type="email"
                value={emailId}
                id='register'
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label>
              Password:
              <div className="registerpassword-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  id='register1'
                  minLength={8}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={`registerpassword-toggle-icon ${showPassword ? 'visible' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : <img src={Hide} id='register' alt='hide' />}
                </span>
              </div>
            </label>
            <label>
              Country No:
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                required
              >
                <option value="">Select Country Code</option>
                <option value="+1">+1 (USA)</option>
                <option value="+7">+7 (Russia)</option>
                <option value="+91">+91 (India)</option>
                <option value="+234">+234 (Nigeria)</option>
                <option value="+971">+971 (Dubai)</option>
              </select>
            </label>
            <label>
              Mobile:
              <input
                type="tel"
                value={mobile}
                id='register'
                minLength={10}
                maxLength={10}
                required
                onChange={(e) => setMobile(e.target.value)}
              />
            </label>
            <div className="login-links">
              <button id='register' type="submit">Register</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button id='register' onClick={() => navigate('/login')}>Login</button>
            </div>
          </form>
        </div>
        {message && <p className="message" type="message">{message}</p>}
      </center>
    </div>
  );
};

export default SignUp;



/*
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Hide from "./Pages/Images/Hide-password.png";
import { BASE_URL } from './Config';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        firstName,
        lastName,
        gender,
        age,
        emailId,
        password,
        mobile,
      });
      if (response.data && response.data.message) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage('An error occurred during registration.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred during registration.');
      }
    }
  };

  return (
    <div className='register-body'>
      <center>
        <h1>Allsmart Agritech Finance Manager</h1>
        <div className="register-container">
          <h2>Customer Register</h2>
          <form onSubmit={handleRegister}>
            <label>
              First Name:&nbsp;&nbsp;
              <input
                type="text"
                value={firstName}
                id='register'
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                value={lastName}
                id='register'
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              Gender:
              <select
                value={gender}
                id='register'
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              Age: 
              <input
                type="number"
                value={age}
                id='register'
                required
                onChange={(e) => setAge(e.target.value)}
                autoComplete="off"
              />
            </label>
            <label>
              Email ID:
              <input
                type="email"
                value={emailId}
                id='register'
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label>
              Password:
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  id='register1'
                  minLength={8}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : <img src={Hide} id='register' alt='hide' />}
                </span>
              </div>
            </label>
            <label>
              Mobile:
              <input
                type="tel"
                value={mobile}
                id='register'
                minLength={10}
                required
                onChange={(e) => setMobile(e.target.value)}
              />
            </label>
            <div className="login-links">
              <button id='register' type="submit">Register</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button id='register' onClick={() => navigate('/login')}>Login</button>
            </div>
          </form>
        </div>
        {message && <p className="message" type="message">{message}</p>}
      </center>
    </div>
  );
};

export default SignUp;




/*


//working
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Hide from "./Pages/Images/Hide-password.png";
import { BASE_URL } from './Config';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        firstName,
        lastName,
        gender,
        age,
        emailId,
        password,
        mobile,
      });
      setMessage("User Registered Successfully");

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred during registration.');
      }
    }
  };
  

  return (
    <>
    <div className='register-body'>
      <center>
        <h1>Allsmart Agritech Finance Manager</h1>
        <div className="register-container">
          <h2>Customer Register</h2>
          <form onSubmit={handleRegister}>
          <label>
          First Name:&nbsp;&nbsp;
          <input
            type="text"
            value={firstName}
            id='register'
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
     
        <label>
          Last Name:&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            value={lastName}
            id='register'
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      
        <label>
          Gender:
          <select
            value={gender}
            id='register'
            required
            onChange={(e) => setGender(e.target.value)}
          >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
       
        <label>
          Age: 
          <input
            type="number"
            value={age}
            id='register'
            required
            onChange={(e) => setAge(e.target.value)}
            autoComplete="off" // Disable autofill
          />
        </label>
       
        <label>
          Email ID:
          <input
            type="email"
            value={emailId}
            id='register'
            required
            onChange={(e) => setEmailId(e.target.value)}
          />
        </label>
       
        
        <label >
        Password:
        <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              id='register1'
              required
              onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
              >
              {showPassword ?  '👁️‍🗨️' : <img src={Hide} id='register' alt='hide' />}
              </span>
          </div>
        </label>
       
        <label>
          Mobile:
          <input
            type="tel"
            value={mobile}
            id='register'
            required
            onChange={(e) => setMobile(e.target.value)}
          />
        </label>
       
        <div className="login-links">
        <button id='register' type="submit">Register</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id='register' onClick={() => navigate('/login')}>Login</button>
      </div>
          </form>
        </div>
        {message && <p class="message" type="message" >{message}</p>}
          
      </center>
      </div>
    </>
  );
};

export default SignUp;

/*
*/