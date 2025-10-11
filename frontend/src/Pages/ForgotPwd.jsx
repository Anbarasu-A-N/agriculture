
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ForgotPwd.css";
import { BASE_URL } from '../Config.jsx';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import Hide from "../Pages/Images/Hide-password.png";

const ForgotPwd = () => {
  const token = useSelector(state => state.token); // Access token from Redux store
  const [emailId, setEmailId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const sendOtp = () => {
    setLoading(true);
  
    axios.post(`${BASE_URL}/userfunction/sendOtp?emailId=${emailId}`, null, { withCredentials: true })
      .then(response => {
        setMessage(response.data);
  
        if (response.data === 'OTP sent successfully') {
          setOtpSent(true);
        }
      })
      .catch(error => {
        console.error('Error sending OTP:', error);
        setMessage('Error sending OTP');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const verifyOtpAndUpdatePassword = () => {
    axios.post(`${BASE_URL}/userfunction/verifyOtpAndUpdatePassword?emailId=${emailId}&otp=${otp}&newPassword=${newPassword}`, { withCredentials: true })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error verifying OTP and updating password:', error);
        setMessage('Error verifying OTP and updating password');
      });
  };

  const navigate = useNavigate();

  return (
    <>
      <center>
        <h1 id='forgot-h1'>Allsmart Agritech Finance Manager</h1>
        <div className="forgot-container">
          <h2 id='forgot'>Forgot Password</h2>
          <div className='forgot-con'>
            <div>
              <label id='forgot-label'>Email:</label>
              <input id='forgot-input' type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </div>
            <center>
              <div>
                <button id="forgot" onClick={sendOtp} disabled={loading}>{loading ? 'Sending OTP...' : 'Send OTP'}</button>
              </div>
            </center>
            
            {otpSent && (
              <div>
                <label id='forgot-label'>OTP:</label>
                <input id='forgot-input' autoComplete="off"  type="number" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <br /><br />
                
                <div className="forgotpassword-input-container">
                <label id='forgot-label'>New Password:</label>
                <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => {
                        const inputRegex = /^[A-Za-z0-9]*$/; // Regular expression for A-Z, a-z, and 0-9
                        if (inputRegex.test(e.target.value) || e.target.value === '') {
                          setNewPassword(e.target.value);
                        }
                      }}
                      id='forgot-input'
                      autoComplete='off'
                      required
                      pattern="[A-Za-z0-9]*"
                    />

                  <span
                    className={`forgotpassword-toggle-icon ${showPassword ? 'visible' : ''}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?  '👁️‍🗨️' : <img src={Hide} id='forgothide' alt='forgothide' />}
                  </span>
                </div>
                <br />
                <button id="forgot" onClick={verifyOtpAndUpdatePassword}>Verify and Update Password</button>
              </div>
            )}
            {message && <p id="forgot">{message}</p>}
          </div>
          <br/>
          <center>
            <div className="pwd-links">
              <button id="forgot" onClick={() => navigate('/login')}>Go to Login</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button id="forgot" onClick={() => navigate('/signup')}>Go to Register</button>
            </div>
          </center>
        </div>
      </center>
    </>
  );
};

export default ForgotPwd;


/*

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ForgotPwd.css";
import { BASE_URL } from '../Config.jsx';

const ForgotPwd = () => {
  const [emailId, setEmailId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const sendOtp = () => {
    setLoading(true);
  
    axios.post(`${BASE_URL}/userfunction/sendOtp?emailId=${emailId}`, null, { withCredentials: true })
      .then(response => {
        setMessage(response.data);
  
        if (response.data === 'OTP sent successfully') {
          setOtpSent(true);
        }
      })
      .catch(error => {
        console.error('Error sending OTP:', error);
        setMessage('Error sending OTP');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  const verifyOtpAndUpdatePassword = () => {
    axios.post(`${BASE_URL}/userfunction/verifyOtpAndUpdatePassword?emailId=${emailId}&otp=${otp}&newPassword=${newPassword}`, { withCredentials: true })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error verifying OTP and updating password:', error);
        setMessage('Error verifying OTP and updating password');
      });
  };
  
  

  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    <center>
    <h1 id='forgot-h1'>Allsmart Agritech Finance Manager</h1>
        <div className="forgot-container">
        <h2 id='forgot'>Forgot Password</h2>
        <div className='forgot-con'>
          <div>
            <label id='forgot-label'>Email:</label>
            <input id='forgot-input' type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
          </div>
          <center>
          <div>
            <button id="forgot" onClick={sendOtp} disabled={loading}>{loading ? 'Sending OTP...' : 'Send OTP'}</button>
          </div>
          </center>
          
          {otpSent && (
            <div>
              <label id='forgot-label'>OTP:</label>
              <input id='forgot-input' autoComplete="off"  type="number" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <br /><br />
              <label id='forgot-label'>New Password:</label>
              <input id='forgot-input' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            
              
              <button id="forgot" onClick={verifyOtpAndUpdatePassword}>Verify and Update Password</button>
              
            </div>
          )}
          {message && <p id="forgot">{message}</p>}
        </div>
        <br/>
        <center>
        <div className="pwd-links">
          <button id="forgot" onClick={() => navigate('/login')}>Go to Login</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button id="forgot" onClick={() => navigate('/signup')}>Go to Register</button>
        </div>
        </center>
        </div>
        </center>
    </>
  );
};

export default ForgotPwd;





/*

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
import axios from 'axios';
import "./ForgotPwd.css";
import { BASE_URL } from '../Config.jsx';

const ForgotPwd = () => {
  const [emailId, setEmailId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const sendOtp = () => {
    axios.post(`${BASE_URL}/user/sendOtp`, { emailId }, { withCredentials: true })
      .then(response => {
        setMessage(response.data);
        // If OTP sent successfully, set OTP state and show the verification form
        if (response.data === 'OTP sent successfully') {
          setOtpSent(true);
        }
      })
      .catch(error => {
        console.error('Error sending OTP:', error);
        setMessage('Error sending OTP');
      });
  };

  const verifyOtpAndUpdatePassword = () => {
    axios.post(`${BASE_URL}/user/verifyOtpAndUpdatePassword`, { emailId, otp, newPassword }, { withCredentials: true })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error verifying OTP and updating password:', error);
        setMessage('Error verifying OTP and updating password');
      });
  };

  const [otpSent, setOtpSent] = useState(false);

  return (
    <>
    <center>
    <div className="pwd-container">
      <h1>Forgot Password</h1>
      <div>
        <label>Email:</label>
        <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
      </div>
      <div>
        <button onClick={sendOtp}>Send OTP</button>
      </div>
      {message && <p>{message}</p>}
      {otpSent && (
        <div>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <br />
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <br />
          <button onClick={verifyOtpAndUpdatePassword}>Verify and Update Password</button>
        </div>
      )}
    </div>
    <div className="pwd-links">
            <button id="forgot" onClick={() => navigate('/login')}>  Go to Login  </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button id="forgot" onClick={() => navigate('/signup')}>Go to Register</button>
      </div>
    </center>
    </>
  );
};

export default ForgotPwd;








/*


import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import "./ForgotPwd.css";
import { BASE_URL } from '../Config.jsx';

const ForgotPwd = () => {
  const [emailId, setEmailId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailIdChange = (e) => {
    setEmailId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .put(`${BASE_URL}/user/reset-password`, null, {
        params: { emailId: emailId },
      })
      .then((response) => {
        console.log(response.data);
        setMessage('Password reset email sent successfully. Check your email for further instructions.');
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          setMessage('Invalid Email ID. Enter the correct Email ID for password reset.');
        } else if (error.response && error.response.status === 404) {
          setMessage('User not found for the given email ID.');
        } else {
          setMessage('Error while processing the password reset request.');
        }
      })
      .finally(() => {
        setLoading(false);
        // Clear the message after a few seconds
        setTimeout(() => {
          setMessage('');
        }, 5000);
      });
  };

  return (
    <>
      <center>
        <h1>Allsmart Agritech Finance Manager</h1>
        <div className="pwd-container">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={emailId}
                onChange={handleEmailIdChange}
                required
              />
            </div>
            
            
            <p>Enter Your Email ID, Then <br/><br/>
             We Emailed you a New Password for your Account.</p>
            <br />
            <br />
            <div>
              <button type="submit" id="forgot" disabled={loading}>
                {loading ? 'Processing...' : 'Reset Password'}
              </button>
            </div>
            <br />
          </form>
          <div className="pwd-links">
            <button id="forgot" onClick={() => navigate('/login')}>  Go to Login  </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="forgot" onClick={() => navigate('/signup')}>Go to Register</button>
          </div>
          <br />
        </div>
        {message && <p className="message">{message}</p>}
      </center>
    </>
  );
};

export default ForgotPwd;

/*
*/