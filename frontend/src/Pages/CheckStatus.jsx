

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CheckStatus.css";
import Navbar from './Navbar';
import Footer from './Footer';
import { BASE_URL } from '../Config.jsx';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

const CheckStatus = () => {
  const token = useSelector(state => state.token); // Access token from Redux store
  const [loanStatusList, setLoanStatusList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoanStatus = async () => {
      try {
        const emailId = localStorage.getItem('emailId');
        const userId = localStorage.getItem('userId'); // Get userId from localStorage

        if (!emailId) {
          console.error('EmailId not found in local storage');
          return;
        }

        const response = await axios.get(`${BASE_URL}/loanApplications/byEmail/${emailId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Pass the token in the request headers
          },
          params: { userId }, // Pass userId as a query parameter only for POST method
        });
        
        setLoanStatusList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch loan statuses:', error.response?.data || error.message);
      }
    };

    fetchLoanStatus();
  }, [token]); // Add token to dependency array

  const getBackgroundColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#ccc';
      case 'rejected':
        return '#b64f4f';
      case 'processing':
        return '#FFC973';
      case 'accepted':
        return '#A2D5AC';
      default:
        return 'white'; // Default color or customize as needed
    }
  };

  return (
    <>
    <Navbar/>
    <div className='checkstatusbgcolor'>
      <br/><br/>
    <div className='checkloanstatus-container'>
    <h2 id='checkstatus'>Check Loan Status</h2>
      {loanStatusList.length > 0 ? (
         <div id='checkstatus1'>
        <div id='checkstatus'>
          {loanStatusList.map((loanStatus, index) => (
            <div id='checkstatus2' key={index} style={{ backgroundColor: getBackgroundColor(loanStatus.loanStatus) }}>
              <span className='checkstatus-label'>Your Loan ID:</span> <span className='checkstatus-value'>{loanStatus.id}</span><br />
              <span className='checkstatus-label'>First Name:</span> <span className='checkstatus-value'>{loanStatus.firstName}</span><br />
              <span className='checkstatus-label'>Last Name:</span> <span className='checkstatus-value'>{loanStatus.lastName}</span><br />
              <span className='checkstatus-label'>Date of Birth:</span> <span className='checkstatus-value'>{new Date(loanStatus.dateOfBirth).toLocaleDateString()}</span><br />
              <span className='checkstatus-label'>Email:</span> <span className='checkstatus-value'>{loanStatus.emailId}</span><br />
              <span className='checkstatus-label'>Aadhar No:</span> <span className='checkstatus-value'>{loanStatus.aadharNo}</span><br />
              <span className='checkstatus-label'>Address:</span> <span className='checkstatus-value'>{loanStatus.address}</span><br />
              <span className='checkstatus-label'>Phone:</span> <span className='checkstatus-value'>{loanStatus.phone}</span><br />
              <span className='checkstatus-label'>Service Type:</span> <span className='checkstatus-value'>{loanStatus.serviceType}</span><br />
              <span className='checkstatus-label'>Farm Size:</span> <span className='checkstatus-value'>{loanStatus.farmSize}</span><br />
              <span className='checkstatus-label'>Farm Location:</span> <span className='checkstatus-value'>{loanStatus.farmLocation}</span><br />
              <span className='checkstatus-label'>Years in Operation:</span> <span className='checkstatus-value'>{loanStatus.yearsInOperation}</span><br />
              <span className='checkstatus-label'>Agricultural Experience:</span> <span className='checkstatus-value'>{loanStatus.agriculturalExperience}</span><br />
              <span className='checkstatus-label'>Loan Amount Request:</span> <span className='checkstatus-value'>{loanStatus.loanAmountRequest}</span><br />
              <span className='checkstatus-label'>Purpose of Loan:</span> <span className='checkstatus-value'>{loanStatus.purposeOfLoan}</span><br />
              <span className='checkstatus-label'>Credit Score:</span> <span className='checkstatus-value'>{loanStatus.creditScore}</span><br />
              <span className='checkstatus-label'>Annual Income from Agriculture:</span> <span className='checkstatus-value'>{loanStatus.annualIncomeFromAgriculture}</span><br />
              <span className='checkstatus-label'>Other Sources of Income:</span> <span className='checkstatus-value'>{loanStatus.otherSourcesOfIncome}</span><br />
              <span className='checkstatus-label'>Loan Status:</span> <span className='checkstatus-value'>{loanStatus.loanStatus}</span><br />
              <hr />
            </div>
          ))}
        </div>
        </div>
      ) : (
        <p>No loan statuses found for the provided emailId.</p>
      )}
    </div>
    <br/><br/>
    </div>
    <Footer/>
    </>
  );
};

export default CheckStatus;





/*

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CheckStatus.css";
import Navbar from './Navbar';
import Footer from './Footer';
import { BASE_URL } from '../Config.jsx';

const CheckStatus = () => {
  const [loanStatusList, setLoanStatusList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoanStatus = async () => {
      try {
        const emailId = localStorage.getItem('emailId');

        if (!emailId) {
          console.error('EmailId not found in local storage');
          return;
        }

        const response = await axios.get(`${BASE_URL}/loanApplications/byEmail/${emailId}`);
        setLoanStatusList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch loan statuses:', error.response?.data || error.message);
      }
    };

    fetchLoanStatus();
  }, []);

  const getBackgroundColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#ccc';
      case 'rejected':
        return '#b64f4f';
      case 'processing':
        return '#FFC973';
      case 'accepted':
        return '#A2D5AC';
      default:
        return 'white'; // Default color or customize as needed
    }
  };

  return (
    <>
    <Navbar/>
    <div className='checkstatusbgcolor'>
      <br/><br/>
    <div className='checkloanstatus-container'>
    <h2 id='checkstatus'>Check Loan Status</h2>
      {loanStatusList.length > 0 ? (
         <div id='checkstatus1'>
        <div id='checkstatus'>
          {loanStatusList.map((loanStatus, index) => (
            <div id='checkstatus2' key={index} style={{ backgroundColor: getBackgroundColor(loanStatus.loanStatus) }}>
              <span className='checkstatus-label'>Your Loan ID:</span> <span className='checkstatus-value'>{loanStatus.id}</span><br />
              <span className='checkstatus-label'>First Name:</span> <span className='checkstatus-value'>{loanStatus.firstName}</span><br />
              <span className='checkstatus-label'>Last Name:</span> <span className='checkstatus-value'>{loanStatus.lastName}</span><br />
              <span className='checkstatus-label'>Date of Birth:</span> <span className='checkstatus-value'>{new Date(loanStatus.dateOfBirth).toLocaleDateString()}</span><br />
              <span className='checkstatus-label'>Email:</span> <span className='checkstatus-value'>{loanStatus.emailId}</span><br />
              <span className='checkstatus-label'>Aadhar No:</span> <span className='checkstatus-value'>{loanStatus.aadharNo}</span><br />
              <span className='checkstatus-label'>Address:</span> <span className='checkstatus-value'>{loanStatus.address}</span><br />
              <span className='checkstatus-label'>Phone:</span> <span className='checkstatus-value'>{loanStatus.phone}</span><br />
              <span className='checkstatus-label'>Service Type:</span> <span className='checkstatus-value'>{loanStatus.serviceType}</span><br />
              <span className='checkstatus-label'>Farm Size:</span> <span className='checkstatus-value'>{loanStatus.farmSize}</span><br />
              <span className='checkstatus-label'>Farm Location:</span> <span className='checkstatus-value'>{loanStatus.farmLocation}</span><br />
              <span className='checkstatus-label'>Years in Operation:</span> <span className='checkstatus-value'>{loanStatus.yearsInOperation}</span><br />
              <span className='checkstatus-label'>Agricultural Experience:</span> <span className='checkstatus-value'>{loanStatus.agriculturalExperience}</span><br />
              <span className='checkstatus-label'>Loan Amount Request:</span> <span className='checkstatus-value'>{loanStatus.loanAmountRequest}</span><br />
              <span className='checkstatus-label'>Purpose of Loan:</span> <span className='checkstatus-value'>{loanStatus.purposeOfLoan}</span><br />
              <span className='checkstatus-label'>Credit Score:</span> <span className='checkstatus-value'>{loanStatus.creditScore}</span><br />
              <span className='checkstatus-label'>Annual Income from Agriculture:</span> <span className='checkstatus-value'>{loanStatus.annualIncomeFromAgriculture}</span><br />
              <span className='checkstatus-label'>Other Sources of Income:</span> <span className='checkstatus-value'>{loanStatus.otherSourcesOfIncome}</span><br />
              <span className='checkstatus-label'>Loan Status:</span> <span className='checkstatus-value'>{loanStatus.loanStatus}</span><br />
              <hr />
            </div>
          ))}
        </div>
        </div>
      ) : (
        <p>No loan statuses found for the provided emailId.</p>
      )}
    </div>
    <br/><br/>
    </div>
    <Footer/>
    </>
  );
};

export default CheckStatus;


/*

*/