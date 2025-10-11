




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./UpdateUserDetails.css";
import { BASE_URL } from '../Config.jsx';

const UpdateUserDetails = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    emailId: '', // This will be taken from localStorage
    mobile: '',
    newEmailId: '', // Mandatory new emailId
  });

  const [message, setMessage] = useState('');
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    // Load the existing emailId from localStorage
    const existingEmailId = localStorage.getItem('emailId');

    // Set the initial state with the existing emailId
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      emailId: existingEmailId || '',
    }));
  }, []);

  useEffect(() => {
    if (reset) {
      const timeoutId = setTimeout(() => {
        setReset(false);
        setMessage('');
      }, 3000);

      // Cleanup the timeout to avoid side effects
      return () => clearTimeout(timeoutId);
    }
  }, [reset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const { newEmailId, ...updatedDetails } = userDetails;

    // Ensure newEmailId is provided and not empty
    if (!newEmailId.trim()) {
      setMessage('New EmailId is mandatory');
      // Display the error message for 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const emailId = localStorage.getItem('emailId');
      const userId = localStorage.getItem('userId'); // Get userId from localStorage
      // Ensure token and emailId are present
      if (!token || !emailId) {
        setMessage('Token or emailId not found');
        setTimeout(() => {
          setMessage('');
        }, 5000);
        return;
      }

      // Construct the request config
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userId }, // Pass userId as a query parameter only for POST method
      };

      // Send the PUT request
      await axios.put(`${BASE_URL}/userfunction/updateDetailsByEmail/${emailId}`, {
        ...updatedDetails,
        emailId: newEmailId,
      }, config);

      // If emailId has changed, prompt user to login again
      if (emailId !== newEmailId) {
        setMessage('EmailId has been updated. Please login again.');
        setTimeout(() => {
          setMessage('');
          navigate('/login');
        }, 5000);
        return;
      }

      // Reset form and show success message
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        newEmailId: '',
      }));
      setReset(true);
      setMessage('User details updated successfully');
    } catch (error) {
      setMessage(error.response?.data || 'Error updating user details');
      // Display the error message for 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div>
      <button className='userdetails-button' id='userdetails-button' onClick={() => setShowUpdate(!showUpdate)}>
        Click Here To {showUpdate ? 'Hide' : 'View'} Update User Details Option
      </button>

      {showUpdate && (
        <div className='userdetails-container'>
          <form id='userdetails'>
            <label >
              Your Login Email ID:&nbsp;
              <input id='userdetails-input'  type="text" name="emailId" value={userDetails.emailId} readOnly />
            </label>
            
            <label >
              New Email ID:
              <input  id='userdetails-input'type="text" name="newEmailId" value={userDetails.newEmailId} onChange={handleChange} />
            </label>
            
            <label >
              First Name:
              <input  id='userdetails-input'type="text" name="firstName" value={userDetails.firstName} onChange={handleChange} />
            </label>
            
            <label >
              Last Name:
              <input  id='userdetails-input'type="text" name="lastName" value={userDetails.lastName} onChange={handleChange} />
            </label>
            
            <label>
              Gender:
             
              <select
                value={userDetails.gender}
                id='userdetails-input'type="text" name="gender"
                required
                onChange={handleChange} autoComplete="off" >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
          </select>
            </label>
            
            <label >
              Age:
              <input  id='userdetails-input'type="number" name="age" value={userDetails.age} onChange={handleChange} 
              autoComplete="off" 
              />
            </label>
           
            <label>
              Mobile: 
             
              <input  id='userdetails-input'type="text" name="mobile" value={userDetails.mobile} onChange={handleChange} 
              minLength={10}
              maxLength={10}
              required
              />
            </label>
            <center>
            
            <button className='userdetails-submit' id='userdetails-submit' type="button" onClick={handleUpdate}>
              Update Details
            </button></center>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default UpdateUserDetails;


/*


*/