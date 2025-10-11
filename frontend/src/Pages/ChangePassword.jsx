






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChangePassword.css';
import Hide from "../Pages/Images/Hide-password.png";
import { BASE_URL } from '../Config.jsx';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

const ChangePassword = () => {
  const token = useSelector(state => state.token); // Access token from Redux store
  const [emailId, setEmailId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [reset, setReset] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emailId') {
      setEmailId(value);
    } else if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  useEffect(() => {
    const storedEmailId = localStorage.getItem('emailId');
    if (storedEmailId) {
      setEmailId(storedEmailId);
    }
  }, []);

  useEffect(() => {
    if (reset) {
      const timeoutId = setTimeout(() => {
        setOldPassword('');
        setNewPassword('');
        setReset(false);
        setMessage('');
      }, 3000);

      // Cleanup the timeout to avoid side effects
      return () => clearTimeout(timeoutId);
    }
  }, [reset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      
      const userId = localStorage.getItem('userId'); // Get userId from localStorage
      await axios.put(`${BASE_URL}/userfunction/change-password`, {
        emailId: emailId,
        oldPassword,
        newPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Pass the token in the request headers
        },
        params: { userId }, // Pass userId as a query parameter only for POST method
      });
  
      setReset(true);
      setMessage('Password Changed Successfully');
    } catch (error) {
      setMessage(error.response.data);
      // Display the error message for 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };
  

  return (
    <div>
      <button className="changepwd-button" id="changepwd-button" onClick={() => setShowChangePassword(!showChangePassword)}>
        Click Here To {showChangePassword ? 'Hide' : 'View'} the Change Password Option
      </button>

      {showChangePassword && (
        <div className="changepwd-container">
          <form onSubmit={handleSubmit}>
            <div className="changepwd-sidebar">
              <label id="changepwd-emailId">Email ID : {emailId}</label>

              <label>
                Old Password:
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="oldPassword" value={oldPassword}
                    id='change-pwd'
                    required
                    onChange={handleChange} 
                  />
                  <span
                    className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?  '👁️‍🗨️' : <img src={Hide} id='hide' alt='hide' />}
                  </span>
                </div>
              
              </label>

              <label>
                New Password:
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword" value={newPassword}
                    id='change-pwd'
                    required
                    onChange={handleChange} 
                  />
                  <span
                    className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?  '👁️‍🗨️' : <img src={Hide} id='hide' alt='hide' />}
                  </span>
                </div>
              
              
              </label>

              <center>
                <button className="changepassword-button1" id="changepassword-button">
                  Change Password
                </button>
              </center>
            </div>
            {message && <p>{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;





/*


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChangePassword.css';
import Hide from "../Pages/Images/Hide-password.png";
import { BASE_URL } from '../Config.jsx';

const ChangePassword = () => {
  const [emailId, setEmailId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [reset, setReset] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emailId') {
      setEmailId(value);
    } else if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  useEffect(() => {
    const storedEmailId = localStorage.getItem('emailId');
    if (storedEmailId) {
      setEmailId(storedEmailId);
    }
  }, []);

  useEffect(() => {
    if (reset) {
      const timeoutId = setTimeout(() => {
        setOldPassword('');
        setNewPassword('');
        setReset(false);
        setMessage('');
      }, 3000);

      // Cleanup the timeout to avoid side effects
      return () => clearTimeout(timeoutId);
    }
  }, [reset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.put(`${BASE_URL}/userfunction/change-password`, {
        emailId: emailId,
        oldPassword,
        newPassword,
      });
  
      setReset(true);
      setMessage('Password Changed Successfully');
    } catch (error) {
      setMessage(error.response.data);
      // Display the error message for 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };
  

  return (
    <div>
      <button className="changepwd-button" id="changepwd-button" onClick={() => setShowChangePassword(!showChangePassword)}>
        Click Here To {showChangePassword ? 'Hide' : 'View'} the Change Password Option
      </button>

      {showChangePassword && (
        <div className="changepwd-container">
          <form onSubmit={handleSubmit}>
            <div className="changepwd-sidebar">
              <label id="changepwd-emailId">Email ID : {emailId}</label>

              <label>
                Old Password:
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="oldPassword" value={oldPassword}
                    id='change-pwd'
                    required
                    onChange={handleChange} 
                  />
                  <span
                    className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?  '👁️‍🗨️' : <img src={Hide} id='hide' alt='hide' />}
                  </span>
                </div>
              
              </label>

              <label>
                New Password:
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword" value={newPassword}
                    id='change-pwd'
                    required
                    onChange={handleChange} 
                  />
                  <span
                    className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?  '👁️‍🗨️' : <img src={Hide} id='hide' alt='hide' />}
                  </span>
                </div>
              
              
              </label>

              <center>
                <button className="changepassword-button1" id="changepassword-button">
                  Change Password
                </button>
              </center>
            </div>
            {message && <p>{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;



/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChangePassword.css';

const ChangePassword = () => {
  const [emailId, setEmailId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [reset, setReset] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emailId') {
      setEmailId(value);
    } else if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  useEffect(() => {
    const storedEmailId = localStorage.getItem('emailId');
    if (storedEmailId) {
      setEmailId(storedEmailId);
    }
  }, []);

  useEffect(() => {
    if (reset) {
      const timeoutId = setTimeout(() => {
        setOldPassword('');
        setNewPassword('');
        setReset(false);
        setMessage('');
      }, 3000);

      // Cleanup the timeout to avoid side effects
      return () => clearTimeout(timeoutId);
    }
  }, [reset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.put('http://localhost:8080/userfunction/change-password', {
        emailId: emailId,
        oldPassword,
        newPassword,
      });
  
      setReset(true);
      setMessage('Password Changed Successfully');
    } catch (error) {
      setMessage(error.response.data);
      // Display the error message for 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };
  

  return (
    <div>
      <button className="changepwd-button" id="changepwd-button" onClick={() => setShowChangePassword(!showChangePassword)}>
        Click Here To {showChangePassword ? 'Hide' : 'View'} the Change Password Option
      </button>

      {showChangePassword && (
        <div className="changepwd-container">
          <form onSubmit={handleSubmit}>
            <div className="changepwd-sidebar">
              <label id="changepwd-emailId">Email ID : {emailId}</label>

              <label>
                Old Password:
                <input type="password" name="oldPassword" value={oldPassword} onChange={handleChange} required />
              </label>

              <label>
                New Password:
                <input type="password" name="newPassword" value={newPassword} onChange={handleChange} required />
              </label>

              <center>
                <button className="changepassword-button" id="changepassword-button">
                  Change Password
                </button>
              </center>
            </div>
            {message && <p>{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;


/*

*/