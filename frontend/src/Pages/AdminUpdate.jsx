
import React, { useEffect, useState } from 'react';
import './AdminUpdate.css';
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';

const AdminUpdate = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('select');
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');
        const userId = localStorage.getItem('userId'); // Get userId from localStorage

        if (emailId !== 'allsmart.org@gmail.com') {
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`${BASE_URL}/AdminGetAllContacts?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
          setFilteredUserDetails(data);
        } else {
          // Handle error if response is not ok
          const errorMessage = await response.text();
          console.error('Failed to fetch user details:', errorMessage);
        }
      } catch (error) {
        // Handle network or other errors
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

  const handleDeleteClick = async (contactId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Get userId from localStorage
      const response = await fetch(`${BASE_URL}/deleteContact/${contactId}?userId=${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        // Successfully deleted contact, update the user details
        const updatedUserDetails = userDetails.filter(user => user.id !== contactId);
        setUserDetails(updatedUserDetails);
        setFilteredUserDetails(updatedUserDetails);
      } else {
        // Handle error if response is not ok
        console.error('Failed to delete contact');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error deleting contact:', error);
    }
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
      <div id='adminupdate' className='adminupdatecontainer'>
        <h1 id='adminupdate'>Contact Details</h1>
        <div id='adminupdate1' className="search-container">
          <label htmlFor="searchCategory" id='adminupdate'>Search Category: </label>
          <select
            id='adminupdate'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='adminupdate' value="select">Select</option>
            <option id='adminupdate' value="firstName">First Name</option>
            <option id='adminupdate' value="lastName">Last Name</option>
            <option id='adminupdate' value="emailId">Email ID</option>
            <option id='adminupdate' value="subject">Subject</option>
          </select>
          <label id='adminupdate' htmlFor="search">Search: </label>
          <input
            type="text"
            id='adminupdate'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='adminupdate' onClick={handleSearchClick}>Search</button>
          <button id='adminupdate' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='adminupdatetablecontainer'>
          <table id='adminupdate'>
            <thead id='adminupdate'>
              <tr>
                <th>Contact ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Subject</th>
                <th>Message Body</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserDetails.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.emailId}</td>
                  <td>{user.subject}</td>
                  <td>{user.msgBody}</td>
                  <td>
                    <button id="adminupdate" onClick={() => handleDeleteClick(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUpdate;


/*

import React, { useEffect, useState } from 'react';
import './AdminUpdate.css';
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';

const AdminUpdate = () => {
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
          // Redirect to login page if emailId is not valid
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`${BASE_URL}/AdminGetAllContacts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
          setFilteredUserDetails(data);
        } else {
          // Handle error if response is not ok
          const errorMessage = await response.text();
          console.error('Failed to fetch user details:', errorMessage);
        }
      } catch (error) {
        // Handle network or other errors
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

  const handleDeleteClick = async (contactId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/deleteContact/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        // Successfully deleted contact, update the user details
        const updatedUserDetails = userDetails.filter(user => user.id !== contactId);
        setUserDetails(updatedUserDetails);
        setFilteredUserDetails(updatedUserDetails);
      } else {
        // Handle error if response is not ok
        console.error('Failed to delete contact');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error deleting contact:', error);
    }
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
      <div id='adminupdate' className='adminupdatecontainer'>
        <h1 id='adminupdate'>Contact Details</h1>
        <div id='adminupdate1' className="search-container">
          <label htmlFor="searchCategory" id='adminupdate'>Search Category: </label>
          <select
            id='adminupdate'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='adminupdate' value="select">Select</option>
            <option id='adminupdate' value="firstName">First Name</option>
            <option id='adminupdate' value="lastName">Last Name</option>
            <option id='adminupdate' value="emailId">Email ID</option>
            <option id='adminupdate' value="subject">Subject</option>
          </select>
          <label id='adminupdate' htmlFor="search">Search: </label>
          <input
            type="text"
            id='adminupdate'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='adminupdate' onClick={handleSearchClick}>Search</button>
          <button id='adminupdate' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='adminupdatetablecontainer'>
          <table id='adminupdate'>
            <thead id='adminupdate'>
              <tr>
                <th>Contact ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Subject</th>
                <th>Message Body</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserDetails.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.emailId}</td>
                  <td>{user.subject}</td>
                  <td>{user.msgBody}</td>
                  <td>
                    <button id="adminupdate" onClick={() => handleDeleteClick(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUpdate;


/*
*/