import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./DeleteUser.css";
import { useNavigate } from 'react-router-dom';
import Hide from "../Pages/Images/Hide-password.png";
import { BASE_URL } from '../Config.jsx';

const DeleteUser = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [reset, setReset] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emailId') {
      setEmailId(value);
    } else if (name === 'password') {
      setPassword(value);
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
        setPassword('');
        setReset(false);
        setMessage('');
      }, 3000);

      // Cleanup the timeout to avoid side effects
      return () => clearTimeout(timeoutId);
    }
  }, [reset]);

  const handleDeleteUser = async (e) => {
    e.preventDefault();
  
    try {
      const emailId = localStorage.getItem('emailId');
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      await axios.delete(`${BASE_URL}/userfunction/delete`, {
        params: {
          emailId: emailId,
          password: password,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });
  
      setReset(true);
      setMessage('User Deleted Successfully');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after 3 seconds
      }, 3000); 
      localStorage.removeItem('emailId');
    } catch (error) {
      setMessage(error.response.data);
      // Display the error message for 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };
  

  return (
    <div >
      <button className="deleteuser-button" id="deleteuser-button" onClick={() => setShowDeleteUser(!showDeleteUser)}>
        Click Here To {showDeleteUser ? 'Hide' : 'View'} the Delete User Option
      </button>

      {showDeleteUser && (
        <div className="deleteuser-container">
          <form onSubmit={handleDeleteUser}>
            <div className="deleteuser-sidebar">
              <label id="deleteuser-emailId">Email ID : {emailId}</label>

              <label>
                Password:
                <div className="password-input-del-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password" value={password}
                    id='delete-user-pwd'
                    required
                    onChange={handleChange} 
                  />
                  <span
                    className={`password-del-toggle-icon ${showPassword ? 'visible' : ''}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?  '👁️‍🗨️' : <img src={Hide} id='delhide' alt='delhide' />}
                  </span>
                </div>
              </label>

              <center>
                <button className="deleteuser-button1" id="deleteuser-button">
                  Delete User
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

export default DeleteUser;
