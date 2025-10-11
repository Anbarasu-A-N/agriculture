import React, { useEffect, useState } from 'react';
import './AdminSupport.css';
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';

const AdminSupport = () => {
  const [supportDetails, setSupportDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('select');
  const [filteredSupportDetails, setFilteredSupportDetails] = useState([]);

  useEffect(() => {
    const fetchSupportDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');
        const userId = localStorage.getItem('userId'); // Get userId from localStorage

        if (emailId !== 'allsmart.org@gmail.com') {
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`${BASE_URL}/support?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setSupportDetails(data);
          setFilteredSupportDetails(data); // Initially set filtered details to all details
        } else if (response.status === 401) {
          console.error('Unauthorized access');
        } else {
          console.error('Failed to fetch support details');
        }
      } catch (error) {
        console.error('Error fetching support details:', error);
      }
    };

    fetchSupportDetails();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchCategory !== 'select') {
      filterSupportDetails(searchTerm, searchCategory);
    }
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setSearchCategory('select');
    setFilteredSupportDetails(supportDetails);
  };

  // Filter support details based on search term and category
  const filterSupportDetails = (term, category) => {
    const filteredDetails = supportDetails.filter(support => {
      const supportValue = support[category].toLowerCase();
      return supportValue.includes(term.toLowerCase());
    });
    setFilteredSupportDetails(filteredDetails);
  };

  return (
    <>
      <AdminNavbar />
      <div id='adminsupport' className='adminsupportcontainer'>
        <h1 id='adminsupport'>Support Details</h1>
        <div id='adminsupport1' className="search-container">
          <label htmlFor="searchCategory" id='adminhome'>Search Category: </label>
          <select
            id='adminsupport'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='adminsupport' value="select">Select</option>
            <option id='adminsupport' value="firstName">First Name</option>
            <option id='adminsupport' value="lastName">Last Name</option>
            <option id='adminsupport' value="emailId">Email ID</option>
            <option id='adminsupport' value="category">Category</option>
            <option id='adminsupport' value="priorityLevel">Priority Level</option>
          </select>
          <label id='adminsupport' htmlFor="search">Search: </label>
          <input
            type="text"
            id='adminsupport'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='adminsupport' onClick={handleSearchClick}>Search</button>
          <button id='adminsupport' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='adminsupporttablecontainer'>
          <table id='adminsupport'>
            <thead id='adminsupport'>
              <tr>
                <th>Support ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Category</th>
                <th>Description</th>
                <th>Priority Level</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredSupportDetails.map(support => (
                <tr key={support.supportId}>
                  <td>{support.supportId}</td>
                  <td>{support.firstName}</td>
                  <td>{support.lastName}</td>
                  <td>{support.emailId}</td>
                  <td>{support.category}</td>
                  <td>{support.description}</td>
                  <td>{support.priorityLevel}</td>
                  <td>{support.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminSupport;


/*

import React, { useEffect, useState } from 'react';
import './AdminSupport.css';
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';

const AdminSupport = () => {
  const [supportDetails, setSupportDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('select');
  const [filteredSupportDetails, setFilteredSupportDetails] = useState([]);

  useEffect(() => {
    const fetchSupportDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');
        
        if (emailId !== 'allsmart.org@gmail.com') {
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`${BASE_URL}/support`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setSupportDetails(data);
          setFilteredSupportDetails(data); // Initially set filtered details to all details
        } else if (response.status === 401) {
          console.error('Unauthorized access');
        } else {
          console.error('Failed to fetch support details');
        }
      } catch (error) {
        console.error('Error fetching support details:', error);
      }
    };

    fetchSupportDetails();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchCategory !== 'select') {
      filterSupportDetails(searchTerm, searchCategory);
    }
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setSearchCategory('select');
    setFilteredSupportDetails(supportDetails);
  };

  // Filter support details based on search term and category
  const filterSupportDetails = (term, category) => {
    const filteredDetails = supportDetails.filter(support => {
      const supportValue = support[category].toLowerCase();
      return supportValue.includes(term.toLowerCase());
    });
    setFilteredSupportDetails(filteredDetails);
  };

  return (
    <>
      <AdminNavbar />
      <div id='adminsupport' className='adminsupportcontainer'>
        <h1 id='adminsupport'>Support Details</h1>
        <div id='adminsupport1' className="search-container">
          <label htmlFor="searchCategory" id='adminhome'>Search Category: </label>
          <select
            id='adminsupport'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='adminsupport' value="select">Select</option>
            <option id='adminsupport' value="firstName">First Name</option>
            <option id='adminsupport' value="lastName">Last Name</option>
            <option id='adminsupport' value="emailId">Email ID</option>
            <option id='adminsupport' value="category">Category</option>
            <option id='adminsupport' value="priorityLevel">Priority Level</option>
          </select>
          <label id='adminsupport' htmlFor="search">Search: </label>
          <input
            type="text"
            id='adminsupport'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='adminsupport' onClick={handleSearchClick}>Search</button>
          <button id='adminsupport' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='adminsupporttablecontainer'>
          <table id='adminsupport'>
            <thead id='adminsupport'>
              <tr>
                <th>Support ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Category</th>
                <th>Description</th>
                <th>Priority Level</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredSupportDetails.map(support => (
                <tr key={support.supportId}>
                  <td>{support.supportId}</td>
                  <td>{support.firstName}</td>
                  <td>{support.lastName}</td>
                  <td>{support.emailId}</td>
                  <td>{support.category}</td>
                  <td>{support.description}</td>
                  <td>{support.priorityLevel}</td>
                  <td>{support.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminSupport;


/*

*/