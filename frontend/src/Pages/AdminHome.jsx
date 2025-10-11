
import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { setUserId } from '../redux/actions'; // Import setUserId action
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminHome = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('select');
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn); // Get isLoggedIn from Redux state
  const userId = useSelector(state => state.userId); // Get userId from Redux state
  
    useEffect(() => {
      if (!userId) {
        fetchUserId();
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
          }
        });
        const userId = response.data.userId; // Extract userId from response
        dispatch(setUserId(userId)); // Save userId in Redux
        localStorage.setItem('userId', userId); // Save userId in localStorage
      } catch (error) {
        console.error("Failed to fetch userId:", error);
      }
    };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');
        const userId = localStorage.getItem('userId');
        if (emailId !== 'allsmart.org@gmail.com') {
          window.location.href = '/login';
          return;
        }
        const response = await axios.get(`${BASE_URL}/userfunction/adminGetDetails`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: { userId }, // Add userId as a parameter in the request
        });
        if (response.status === 200) {
          const data = await response.data;
          setUserDetails(data);
          setFilteredUserDetails(data); // Initially set filtered details to all details
        } else if (response.status === 401) {
          console.error('Unauthorized access');
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchCategory !== 'select') {
      filterUserDetails(searchTerm, searchCategory);
    }
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setSearchCategory('select');
    setFilteredUserDetails(userDetails);
  };

  const filterUserDetails = (term, category) => {
    const filteredDetails = userDetails.filter(user => {
      const userValue = user[category].toLowerCase();
      return userValue.includes(term.toLowerCase());
    });
    setFilteredUserDetails(filteredDetails);
  };

  return (
    <>
      <AdminNavbar />
      <div id='adminhome' className='adminhomecontainer'>
        <h1 id='adminhome'>User Details</h1>
        <div id='adminhome1' className="search-container">
          <label htmlFor="searchCategory" id='adminhome'>Search Category: </label>
          <select
            id='adminhome'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='adminhome' value="select">Select</option>
            <option id='adminhome' value="firstName">First Name</option>
            <option id='adminhome' value="lastName">Last Name</option>
            <option id='adminhome' value="emailId">Email ID</option>
          </select>
          <label id='adminhome' htmlFor="search">Search: </label>
          <input
            type="text"
            id='adminhome'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='adminhome' onClick={handleSearchClick}>Search</button>
          <button id='adminhome' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='adminhometablecontainer'>
          <table id='adminhome'>
            <thead id='adminhome'>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Email ID</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserDetails.map(user => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td>{user.emailId}</td>
                  <td>{user.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminHome;


/*

import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';

const AdminHome = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('select');
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');
        if (emailId !== 'allsmart.org@gmail.com') {
          window.location.href = '/login';
          return;
        }
        const response = await fetch(`${BASE_URL}/userfunction/adminGetDetails`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setUserDetails(data);
          setFilteredUserDetails(data); // Initially set filtered details to all details
        } else if (response.status === 401) {
          console.error('Unauthorized access');
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchCategory !== 'select') {
      filterUserDetails(searchTerm, searchCategory);
    }
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setSearchCategory('select');
    setFilteredUserDetails(userDetails);
  };

  const filterUserDetails = (term, category) => {
    const filteredDetails = userDetails.filter(user => {
      const userValue = user[category].toLowerCase();
      return userValue.includes(term.toLowerCase());
    });
    setFilteredUserDetails(filteredDetails);
  };

  return (
    <>
      <AdminNavbar />
      <div id='adminhome' className='adminhomecontainer'>
        <h1 id='adminhome'>User Details</h1>
        <div id='adminhome1' className="search-container">
          <label htmlFor="searchCategory" id='adminhome'>Search Category: </label>
          <select
            id='adminhome'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='adminhome' value="select">Select</option>
            <option id='adminhome' value="firstName">First Name</option>
            <option id='adminhome' value="lastName">Last Name</option>
            <option id='adminhome' value="emailId">Email ID</option>
          </select>
          <label id='adminhome' htmlFor="search">Search: </label>
          <input
            type="text"
            id='adminhome'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='adminhome' onClick={handleSearchClick}>Search</button>
          <button id='adminhome' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='adminhometablecontainer'>
          <table id='adminhome'>
            <thead id='adminhome'>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Email ID</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserDetails.map(user => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td>{user.emailId}</td>
                  <td>{user.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminHome;



/*

*/