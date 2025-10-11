

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { logout, setUserId } from '../redux/actions'; // Import setUserId action
import ChangePassword from './ChangePassword';
import UpdateUserDetails from './UpdateUserDetails';
import DeleteUser from './DeleteUser';
import { BASE_URL } from '../Config.jsx';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // State to store profile image
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn); // Get isLoggedIn from Redux state
  const userId = useSelector(state => state.userId); // Get userId from Redux state
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  useEffect(() => {
    if (!userId) {
      fetchUserId();
    } else {
      fetchProfile();
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const emailId = localStorage.getItem('emailId');
      if (!isLoggedIn && !emailId && token) { // Check if user is not logged in
        navigate('/login');
        return;
      }

      const response = await axios.get(`${BASE_URL}/userfunction/profile`, {
        params: { emailId },
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });
      const userId = response.data.userId; // Extract userId from response
      dispatch(setUserId(userId)); // Save userId in Redux
      localStorage.setItem('userId', userId); // Save userId in localStorage
      fetchProfileImage(response.data.profileImagePath, userId); // Fetch profile image
    } catch (error) {
      console.error("Failed to fetch userId:", error);
    }
  };

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const emailId = localStorage.getItem('emailId');
      if (!isLoggedIn && !emailId && token) { // Check if user is not logged in
        navigate('/login');
        return;
      }

      const response = await axios.get(`${BASE_URL}/userfunction/profile`, {
        params: { emailId },
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });
      setUser(response.data);
      setIsLoading(false);

      // Fetch profile image only if it is not already fetched
      if (!isImageUploaded) {
        fetchProfileImage(response.data.profileImagePath, response.data.userId); // Pass userId to fetchProfileImage
        setIsImageUploaded(true);
      }
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  }, [navigate, isLoggedIn, isImageUploaded]);

  const fetchProfileImage = async (imageName, userId) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
      const response = await axios.get(`${BASE_URL}/userfunction/getImage/${imageName}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
        params: { userId }, // Add userId as a parameter in the request
      });
      setProfileImage(URL.createObjectURL(response.data));
    } catch (error) {
      console.error(error);
      // Handle error if unable to fetch profile image
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsImageUploaded(false); // Reset isImageUploaded state
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      await axios.post(`${BASE_URL}/userfunction/${userId}/uploadImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
        params: { userId }, // Add userId as a parameter in the request
      });

      // Fetch updated user profile after successful upload
      await fetchProfile();

      setIsImageUploaded(true); // Set isImageUploaded to true after uploading image

      alert('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to upload image. Please try again later.');
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to update Redux state
    localStorage.removeItem('emailId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className='profilebgcolor'>
        <br/>
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-image">
              {profileImage ? (
                <img
                  src={profileImage}
                  style={{ width: '200px', height: '200px', borderRadius: '100px'}}
                  alt="User"
                />
              ) : (
                <p>No profile image available</p>
              )}
              <input type="file" onChange={handleFileChange} />
              <button className="profile-button" id="profile-button" onClick={handleUpload}>Upload Photo</button>
            </div>
            <div className="profile-info">
              <h4>Full Name: {user ? user.firstName : ''}&nbsp;{user ? user.lastName : ''}</h4>
              <p>Age: {user ? user.age : ''}</p>
              <p>Gender: {user ? user.gender : ''}</p>
              <p>Email: {user ? user.emailId : ''}</p>
              <p>Phone: {user ? user.countryCode : ''} &nbsp;{user ? user.mobile : ''}</p>
              <button className="profile-button1" id="profile-button1" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
          <div className="profile-content">
            <div className="profile-section">
              <h2>Settings</h2>
            </div>
            <div className="profile-section">
              <br/>
              <UpdateUserDetails/><ChangePassword/><DeleteUser/>
              <h2>
                <Link to="/review">Give Your Review</Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;



