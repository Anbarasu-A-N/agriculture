import React, { useEffect, useState } from 'react';
import './AdminCheckStatus.css'; // Make sure to replace with your actual CSS file
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';
import axios from 'axios'; // Import axios

const AdminCheckStatus = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('select');
  const [filteredLoanApplications, setFilteredLoanApplications] = useState([]);

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const emailId = localStorage.getItem('emailId');
        if (emailId !== 'allsmart.org@gmail.com') {
          window.location.href = '/login';
          return;
        }
        const response = await axios.get(`${BASE_URL}/loanApplications/GetAll`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: { userId }, // Add userId as a query parameter
        });
        if (response.status === 200) {
          const data = response.data; // Use response.data directly
          setLoanApplications(data);
          setFilteredLoanApplications(data); // Initially set filtered details to all details
        } else {
          console.error('Failed to fetch loan applications');
        }
      } catch (error) {
        console.error('Error fetching loan applications:', error);
      }
    };

    fetchLoanApplications();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchCategory !== 'select') {
      filterLoanApplications(searchTerm, searchCategory);
    }
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setSearchCategory('select');
    setFilteredLoanApplications(loanApplications);
  };

  const filterLoanApplications = (term, category) => {
    const filteredApplications = loanApplications.filter(application => {
      const applicationValue = application[category].toLowerCase();
      return applicationValue.includes(term.toLowerCase());
    });
    setFilteredLoanApplications(filteredApplications);
  };

  const handleStatusChange = (event, loanId) => {
    const updatedLoanApplications = loanApplications.map(application => {
      if (application.id === loanId) {
        return { ...application, loanStatus: event.target.value };
      }
      return application;
    });

    setLoanApplications(updatedLoanApplications);
    setFilteredLoanApplications(updatedLoanApplications);
  };

  const handleConfirmClick = async (loanId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`${BASE_URL}/loanApplications/AdminUpdate/${loanId}`, 
        filteredLoanApplications.find(application => application.id === loanId),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          params: { userId }, // Add userId as a query parameter
        }
      );

      if (response.status === 200) {
        console.log('Loan status updated successfully');
        // Optionally, you can fetch the updated loan applications after the update
      } else {
        console.error('Failed to update loan status');
      }
    } catch (error) {
      console.error('Error updating loan status:', error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div id='admincheckstatus' className='admincheckstatuscontainer'>
        <h1 id='admincheckstatus'>Loan Application Status</h1>
        <div id='admincheckstatus1' className="search-container">
          <label htmlFor="searchCategory" id='admincheckstatus'>Search Category: </label>
          <select
            id='admincheckstatus'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='admincheckstatus' value="select">Select</option>
            <option id='admincheckstatus' value="firstName">First Name</option>
            <option id='admincheckstatus' value="lastName">Last Name</option>
            <option id='admincheckstatus' value="emailId">Email ID</option>
            {/* Add more options based on your Loan model */}
          </select>
          <label id='admincheckstatus' htmlFor="search">Search: </label>
          <input
            type="text"
            id='admincheckstatus'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='admincheckstatus' onClick={handleSearchClick}>Search</button>
          <button id='admincheckstatus' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='admincheckstatustablecontainer'>
          <table id='admincheckstatus'>
            <thead id='admincheckstatus'>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Aadhar Number</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Service Type</th>
                <th>Farm Size</th>
                <th>Agri Experience</th>
                <th>Amount Request</th>
                <th>Total Income</th>
                <th>Loan Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoanApplications.map(application => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.firstName}</td>
                  <td>{application.lastName}</td>
                  <td>{application.emailId}</td>
                  <td>{application.aadharNo}</td>
                  <td>{application.address}</td>
                  <td>{application.phone}</td>
                  <td>{application.serviceType}</td>
                  <td>{application.farmSize}</td>
                  <td>{application.agriculturalExperience}</td>
                  <td>{application.loanAmountRequest}</td>
                  <td>{application.annualIncomeFromAgriculture + application.otherSourcesOfIncome}</td>
                  <td>{application.loanStatus}</td>
                  <td>
                    <select id='admincheckstatusselect'
                      value={application.loanStatus}
                      onChange={(event) => handleStatusChange(event, application.id)}
                    >
                      <option id='admincheckstatusselect' value="Select">Select</option>
                      <option id='admincheckstatusselect' value="Finished">Finished</option>
                      <option id='admincheckstatusselect' value="Processing">Processing</option>
                      <option id='admincheckstatusselect' value="Accepted">Accepted</option>
                      <option id='admincheckstatusselect' value="Rejected">Rejected</option>
                    </select>
                    <button id='admincheckstatusselect' onClick={() => handleConfirmClick(application.id)}>Confirm</button>
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

export default AdminCheckStatus;




/*

import React, { useEffect, useState } from 'react';
import './AdminCheckStatus.css'; // Make sure to replace with your actual CSS file
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';

const AdminCheckStatus = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('select');
  const [filteredLoanApplications, setFilteredLoanApplications] = useState([]);

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');
        if (emailId !== 'allsmart.org@gmail.com') {
          window.location.href = '/login';
          return;
        }
        const response = await fetch(`${BASE_URL}/loanApplications/GetAll`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setLoanApplications(data);
          setFilteredLoanApplications(data); // Initially set filtered details to all details
        } else {
          console.error('Failed to fetch loan applications');
        }
      } catch (error) {
        console.error('Error fetching loan applications:', error);
      }
    };

    fetchLoanApplications();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchCategory !== 'select') {
      filterLoanApplications(searchTerm, searchCategory);
    }
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setSearchCategory('select');
    setFilteredLoanApplications(loanApplications);
  };

  const filterLoanApplications = (term, category) => {
    const filteredApplications = loanApplications.filter(application => {
      const applicationValue = application[category].toLowerCase();
      return applicationValue.includes(term.toLowerCase());
    });
    setFilteredLoanApplications(filteredApplications);
  };

  const handleStatusChange = (event, loanId) => {
    const updatedLoanApplications = loanApplications.map(application => {
      if (application.id === loanId) {
        return { ...application, loanStatus: event.target.value };
      }
      return application;
    });

    setLoanApplications(updatedLoanApplications);
    setFilteredLoanApplications(updatedLoanApplications);
  };

  const handleConfirmClick = async (loanId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/loanApplications/AdminUpdate/${loanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(filteredLoanApplications.find(application => application.id === loanId)),
      });

      if (response.status === 200) {
        console.log('Loan status updated successfully');
        // Optionally, you can fetch the updated loan applications after the update
      } else {
        console.error('Failed to update loan status');
      }
    } catch (error) {
      console.error('Error updating loan status:', error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div id='admincheckstatus' className='admincheckstatuscontainer'>
        <h1 id='admincheckstatus'>Loan Application Status</h1>
        <div id='admincheckstatus1' className="search-container">
          <label htmlFor="searchCategory" id='admincheckstatus'>Search Category: </label>
          <select
            id='admincheckstatus'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='admincheckstatus' value="select">Select</option>
            <option id='admincheckstatus' value="firstName">First Name</option>
            <option id='admincheckstatus' value="lastName">Last Name</option>
            <option id='admincheckstatus' value="emailId">Email ID</option>
            
          </select>
          <label id='admincheckstatus' htmlFor="search">Search: </label>
          <input
            type="text"
            id='admincheckstatus'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='admincheckstatus' onClick={handleSearchClick}>Search</button>
          <button id='admincheckstatus' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='admincheckstatustablecontainer'>
          <table id='admincheckstatus'>
            <thead id='admincheckstatus'>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Aadhar Number</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Service Type</th>
                <th>Farm Size</th>
                <th>Agri Experience</th>
                <th>Amount Request</th>
                <th>Total Income</th>
                <th>Loan Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoanApplications.map(application => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.firstName}</td>
                  <td>{application.lastName}</td>
                  <td>{application.emailId}</td>
                  <td>{application.aadharNo}</td>
                  <td>{application.address}</td>
                  <td>{application.phone}</td>
                  <td>{application.serviceType}</td>
                  <td>{application.farmSize}</td>
                  <td>{application.agriculturalExperience}</td>
                  <td>{application.loanAmountRequest}</td>
                  <td>{application.annualIncomeFromAgriculture + application.otherSourcesOfIncome}</td>
                  <td>{application.loanStatus}</td>
                  <td>
                    <select id='admincheckstatusselect'
                      value={application.loanStatus}
                      onChange={(event) => handleStatusChange(event, application.id)}
                    >
                      <option id='admincheckstatusselect' value="Select">Select</option>
                      <option id='admincheckstatusselect' value="Finished">Finished</option>
                      <option id='admincheckstatusselect' value="Processing">Processing</option>
                      <option id='admincheckstatusselect' value="Accepted">Accepted</option>
                      <option id='admincheckstatusselect' value="Rejected">Rejected</option>
                    </select>
                    <button id='admincheckstatusselect' onClick={() => handleConfirmClick(application.id)}>Confirm</button>
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

export default AdminCheckStatus;

/*
*/