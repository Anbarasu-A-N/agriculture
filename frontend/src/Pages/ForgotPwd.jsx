

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ForgotPwd.css";
import { BASE_URL } from '../Config.jsx';
import { useSelector } from 'react-redux';
import Hide from "../Pages/Images/Hide-password.png";

const ForgotPwd = () => {
  const token = useSelector(state => state.token);
  const [emailId, setEmailId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const sendOtp = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/userfunction/sendOtp?emailId=${emailId}`, null, { withCredentials: true })
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
      .finally(() => setLoading(false));
  };

  const verifyOtpAndUpdatePassword = () => {
    // ✅ Encode parameters to allow multiple special characters safely
    const encodedEmail = encodeURIComponent(emailId);
    const encodedOtp = encodeURIComponent(otp);
    const encodedPassword = encodeURIComponent(newPassword);

    axios
      .post(
        `${BASE_URL}/userfunction/verifyOtpAndUpdatePassword?emailId=${encodedEmail}&otp=${encodedOtp}&newPassword=${encodedPassword}`,
        null,
        { withCredentials: true }
      )
      .then(response => {
        setMessage(response.data);
        if (response.data === 'Password updated successfully') {
          setTimeout(() => navigate('/login'), 3000);
        }
      })
      .catch(error => {
        console.error('Error verifying OTP and updating password:', error);
        setMessage('Error verifying OTP or updating password');
      });
  };

  return (
    <center>
      <h1 id="forgot-h1">Allsmart Agritech Finance Manager</h1>
      <div className="forgot-container">
        <h2 id="forgot">Forgot Password</h2>
        <div className="forgot-con">
          <div>
            <label id="forgot-label">Email:</label>
            <input
              id="forgot-input"
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <center>
            <div>
              <button id="forgot" onClick={sendOtp} disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          </center>

          {otpSent && (
            <div>
              <label id="forgot-label">OTP:</label>
              <input
                id="forgot-input"
                autoComplete="off"
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <br /><br />

              <div className="forgotpassword-input-container">
                <label id="forgot-label">New Password:</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="forgot-input"
                  autoComplete="off"
                  required
                  minLength={8} // ✅ Enforce minimum length directly in input
                />
                <span
                  className={`forgotpassword-toggle-icon ${showPassword ? 'visible' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : <img src={Hide} id="forgothide" alt="forgothide" />}
                </span>
              </div>
              <br />
              <button id="forgot" onClick={verifyOtpAndUpdatePassword}>
                Verify and Update Password
              </button>
            </div>
          )}
          {message && <p id="forgot">{message}</p>}
        </div>
        <br />
        <center>
          <div className="pwd-links">
            <button id="forgot" onClick={() => navigate('/login')}>
              Go to Login
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="forgot" onClick={() => navigate('/signup')}>
              Go to Register
            </button>
          </div>
        </center>
      </div>
    </center>
  );
};

export default ForgotPwd;



/*

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ForgotPwd.css";
import { BASE_URL } from '../Config.jsx';
import { useSelector } from 'react-redux';
import Hide from "../Pages/Images/Hide-password.png";

const ForgotPwd = () => {
  const token = useSelector(state => state.token);
  const [emailId, setEmailId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(''); // Add state for password validation errors

  const sendOtp = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/userfunction/sendOtp?emailId=${emailId}`, null, { withCredentials: true })
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
    // Optional: Validate password strength before sending
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setPasswordError('Password must include at least one special character');
      return;
    }
    setPasswordError(''); // Clear error if validation passes

    axios
      .post(
        `${BASE_URL}/userfunction/verifyOtpAndUpdatePassword?emailId=${emailId}&otp=${otp}&newPassword=${newPassword}`,
        null,
        { withCredentials: true }
      )
      .then(response => {
        setMessage(response.data);
        if (response.data === 'Password updated successfully') {
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      })
      .catch(error => {
        console.error('Error verifying OTP and updating password:', error);
        setMessage('Error verifying OTP or updating password');
      });
  };

  const navigate = useNavigate();

  return (
    <center>
      <h1 id="forgot-h1">Allsmart Agritech Finance Manager</h1>
      <div className="forgot-container">
        <h2 id="forgot">Forgot Password</h2>
        <div className="forgot-con">
          <div>
            <label id="forgot-label">Email:</label>
            <input
              id="forgot-input"
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <center>
            <div>
              <button id="forgot" onClick={sendOtp} disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          </center>

          {otpSent && (
            <div>
              <label id="forgot-label">OTP:</label>
              <input
                id="forgot-input"
                autoComplete="off"
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <br />
              <br />

              <div className="forgotpassword-input-container">
                <label id="forgot-label">New Password:</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value); // Allow all characters
                  }}
                  id="forgot-input"
                  autoComplete="off"
                  minLength={8}
                  required
                />
                <span
                  className={`forgotpassword-toggle-icon ${showPassword ? 'visible' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : <img src={Hide} id="forgothide" alt="forgothide" />}
                </span>
              </div>
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
              <br />
              <button id="forgot" onClick={verifyOtpAndUpdatePassword}>
                Verify and Update Password
              </button>
            </div>
          )}
          {message && <p id="forgot">{message}</p>}
        </div>
        <br />
        <center>
          <div className="pwd-links">
            <button id="forgot" onClick={() => navigate('/login')}>
              Go to Login
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="forgot" onClick={() => navigate('/signup')}>
              Go to Register
            </button>
          </div>
        </center>
      </div>
    </center>
  );
};

export default ForgotPwd;


/*
*/