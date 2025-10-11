import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./ApplyLoan.css";
import { useSelector } from 'react-redux'; 
import Footer from './Footer';
import Navbar from './Navbar';
import { BASE_URL } from '../Config.jsx';

const ApplyLoan = () => {
  const [user, setUser] = useState({});
  const token = useSelector(state => state.token);
  const [messageText, setMessageText] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    emailId: '',
    aadharNo: '',
    address: '',
    phone: '',
    serviceType: '',
    farmSize: '',
    farmLocation: '',
    yearsInOperation: '',
    agriculturalExperience: '',
    loanAmountRequest: '',
    purposeOfLoan: '',
    creditScore: '',
    annualIncomeFromAgriculture: '',
    otherSourcesOfIncome: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const emailId = localStorage.getItem('emailId');
      if (!emailId) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${BASE_URL}/userfunction/profile`, {
        params: { emailId },
        headers: {
          'Authorization': `Bearer ${token}` // Pass the token in the request headers
        },
      });

      setUser(response.data);

      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        emailId: response.data.emailId,
        // ... (update other form fields based on user data)
      });
    } catch (error) {
        navigate('/login');
      // Handle errors (e.g., redirect to login)
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }

    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email is required';
    }

    if (!formData.aadharNo.trim()) {
      newErrors.aadharNo = 'Aadhar Number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = 'Service Type is required';
    }

    if (!formData.farmSize.trim()) {
      newErrors.farmSize = 'Farm Size is required';
    }

    if (!formData.farmLocation.trim()) {
      newErrors.farmLocation = 'Farm Location is required';
    }

    if (!formData.yearsInOperation.trim()) {
      newErrors.yearsInOperation = 'Years in Operation is required';
    }

    if (!formData.agriculturalExperience.trim()) {
      newErrors.agriculturalExperience = 'Agricultural Experience is required';
    }

    if (!formData.loanAmountRequest.trim()) {
      newErrors.loanAmountRequest = 'Loan Amount Request is required';
    }

    if (!formData.purposeOfLoan.trim()) {
      newErrors.purposeOfLoan = 'Purpose of Loan is required';
    }

    if (!formData.creditScore.trim()) {
      newErrors.creditScore = 'Credit Score is required';
    }

    if (!formData.annualIncomeFromAgriculture.trim()) {
      newErrors.annualIncomeFromAgriculture = 'Annual Income from Agriculture is required';
    }

    if (!formData.otherSourcesOfIncome.trim()) {
      newErrors.otherSourcesOfIncome = 'Other Sources of Income is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setSubmitting(true);

        const userId = localStorage.getItem('userId'); // Get userId from localStorage

        const response = await axios.post(`${BASE_URL}/loanApplications`, formData, {
          headers: {
            'Authorization': `Bearer ${token}` // Pass the token in the request headers
          },
          params: { userId }, // Pass userId as a query parameter only for POST method
        });

        console.log('Loan application submitted successfully:', response.data);
        setMessageText('Loan application submitted successfully!');
      } catch (error) {
        console.error('Error submitting loan application:', error.message);
      } finally {
        setSubmitting(false);
        setTimeout(() => {
            setMessageText('');
          }, 5000);
      }
    }
  };


  return (
    <>
    <Navbar/>
    <div className='applyloanbgcolor'>
      <br/><br/>
    
    <center>
    <div className='applyloancontainer'>
      <h2 id='applyloan-id' >Apply for a Loan</h2>
      <form  id='applyloan-id' onSubmit={handleSubmit}>

        {/*EmailId , FirstName & LastName only for readable using command "readOnly" */}
        <div id='applyloan-id'>
          <label id='applyloan-id'>
            First Name:
            <input id='applyloan-id' type="text" name="firstName" value={formData.firstName} onChange={handleChange} required readOnly/>
          </label>
          <span style={{ color: 'red' }}>{errors.firstName}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Last Name:
            <input id='applyloan-id' type="text" name="lastName" value={formData.lastName} onChange={handleChange} required readOnly/>
          </label>
          <span style={{ color: 'red' }}>{errors.lastName}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Date of Birth:
            <input id='applyloan-id' type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.dateOfBirth}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Email:
            <input id='applyloan-id' type="email" name="emailId" value={formData.emailId} onChange={handleChange} required readOnly/>
          </label>
          <span style={{ color: 'red' }}>{errors.emailId}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Aadhar Number:
            <input id='applyloan-id' type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.aadharNo}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Address:
            <input id='applyloan-id' type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.address}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Phone:
            <input id='applyloan-id' type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.phone}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Service Type:
            <select id='applyloan-id' name="serviceType" value={formData.serviceType} onChange={handleChange} required>
              <option id='applyloan-id' value="">Select Service Type</option>
              <option id='applyloan-id' value="Crop Loan">Crop Loan</option>
              <option id='applyloan-id' value="Agri Land Loan">Agri Land Loan</option>
              <option id='applyloan-id' value="Machine Loan">Machine Loan</option>
              <option id='applyloan-id' value="Infrastructure Loan">Infrastructure Loan</option>
              <option id='applyloan-id' value="Dairy Farm Loan">Dairy Farm Loan</option>
            </select>
          </label>
          <span style={{ color: 'red' }}>{errors.serviceType}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Farm Size:
            <input id='applyloan-id' type="text" name="farmSize" value={formData.farmSize} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.farmSize}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Farm Location:
            <input id='applyloan-id' type="text" name="farmLocation" value={formData.farmLocation} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.farmLocation}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Years in Operation:
            <input id='applyloan-id' type="number" name="yearsInOperation" value={formData.yearsInOperation} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.yearsInOperation}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Agricultural Experience:
            <input id='applyloan-id' type="text" name="agriculturalExperience" value={formData.agriculturalExperience} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.agriculturalExperience}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Loan Amount Request:
            <input id='applyloan-id' type="text" name="loanAmountRequest" value={formData.loanAmountRequest} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.loanAmountRequest}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Purpose of Loan:
            <input id='applyloan-id'type="text" name="purposeOfLoan" value={formData.purposeOfLoan} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.purposeOfLoan}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Credit Score:
            <input id='applyloan-id' type="text" name="creditScore" value={formData.creditScore} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.creditScore}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Annual Income from Agriculture:
            <input id='applyloan-id' type="text" name="annualIncomeFromAgriculture" value={formData.annualIncomeFromAgriculture} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.annualIncomeFromAgriculture}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Other Sources of Income:
            <input id='applyloan-id' type="text" name="otherSourcesOfIncome" value={formData.otherSourcesOfIncome} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.otherSourcesOfIncome}</span>
        </div>
        <center>
        <button className='applyloan-button' id='applyloan-id' type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
        </center>
        {messageText && <p className="message">{messageText}</p>}
      </form>
    </div>
    </center>
    <br/><br/>
    </div>
    
    <Footer/>
    
    </>
  );
};

export default ApplyLoan;



/*


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./ApplyLoan.css";
import Footer from './Footer';
import Navbar from './Navbar';
import { BASE_URL } from '../Config.jsx';

const ApplyLoan = () => {
  const [user, setUser] = useState({});
  const [messageText, setMessageText] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    emailId: '',
    aadharNo: '',
    address: '',
    phone: '',
    serviceType: '',
    farmSize: '',
    farmLocation: '',
    yearsInOperation: '',
    agriculturalExperience: '',
    loanAmountRequest: '',
    purposeOfLoan: '',
    creditScore: '',
    annualIncomeFromAgriculture: '',
    otherSourcesOfIncome: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const emailId = localStorage.getItem('emailId');
      if (!emailId) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${BASE_URL}/userfunction/profile`, {
        params: { emailId },
      });

      setUser(response.data);

      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        emailId: response.data.emailId,
        // ... (update other form fields based on user data)
      });
    } catch (error) {
        navigate('/login');
      // Handle errors (e.g., redirect to login)
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }

    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email is required';
    }

    if (!formData.aadharNo.trim()) {
      newErrors.aadharNo = 'Aadhar Number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = 'Service Type is required';
    }

    if (!formData.farmSize.trim()) {
      newErrors.farmSize = 'Farm Size is required';
    }

    if (!formData.farmLocation.trim()) {
      newErrors.farmLocation = 'Farm Location is required';
    }

    if (!formData.yearsInOperation.trim()) {
      newErrors.yearsInOperation = 'Years in Operation is required';
    }

    if (!formData.agriculturalExperience.trim()) {
      newErrors.agriculturalExperience = 'Agricultural Experience is required';
    }

    if (!formData.loanAmountRequest.trim()) {
      newErrors.loanAmountRequest = 'Loan Amount Request is required';
    }

    if (!formData.purposeOfLoan.trim()) {
      newErrors.purposeOfLoan = 'Purpose of Loan is required';
    }

    if (!formData.creditScore.trim()) {
      newErrors.creditScore = 'Credit Score is required';
    }

    if (!formData.annualIncomeFromAgriculture.trim()) {
      newErrors.annualIncomeFromAgriculture = 'Annual Income from Agriculture is required';
    }

    if (!formData.otherSourcesOfIncome.trim()) {
      newErrors.otherSourcesOfIncome = 'Other Sources of Income is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setSubmitting(true);

        const response = await axios.post(`${BASE_URL}/loanApplications`, formData);

        console.log('Loan application submitted successfully:', response.data);
        setMessageText('Loan application submitted successfully!');
      } catch (error) {
        console.error('Error submitting loan application:', error.message);
      } finally {
        setSubmitting(false);
        setTimeout(() => {
            setMessageText('');
          }, 5000);
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className='applyloanbgcolor'>
      <br/><br/>
    
    <center>
    <div className='applyloancontainer'>
      <h2 id='applyloan-id' >Apply for a Loan</h2>
      <form  id='applyloan-id' onSubmit={handleSubmit}>

        //*EmailId , FirstName & LastName only for readable using command "readOnly" 
        <div id='applyloan-id'>
          <label id='applyloan-id'>
            First Name:
            <input id='applyloan-id' type="text" name="firstName" value={formData.firstName} onChange={handleChange} required readOnly/>
          </label>
          <span style={{ color: 'red' }}>{errors.firstName}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Last Name:
            <input id='applyloan-id' type="text" name="lastName" value={formData.lastName} onChange={handleChange} required readOnly/>
          </label>
          <span style={{ color: 'red' }}>{errors.lastName}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Date of Birth:
            <input id='applyloan-id' type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.dateOfBirth}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Email:
            <input id='applyloan-id' type="email" name="emailId" value={formData.emailId} onChange={handleChange} required readOnly/>
          </label>
          <span style={{ color: 'red' }}>{errors.emailId}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Aadhar Number:
            <input id='applyloan-id' type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.aadharNo}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Address:
            <input id='applyloan-id' type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.address}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Phone:
            <input id='applyloan-id' type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.phone}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Service Type:
            <select id='applyloan-id' name="serviceType" value={formData.serviceType} onChange={handleChange} required>
              <option id='applyloan-id' value="">Select Service Type</option>
              <option id='applyloan-id' value="Crop Loan">Crop Loan</option>
              <option id='applyloan-id' value="Agri Land Loan">Agri Land Loan</option>
              <option id='applyloan-id' value="Machine Loan">Machine Loan</option>
              <option id='applyloan-id' value="Infrastructure Loan">Infrastructure Loan</option>
              <option id='applyloan-id' value="Dairy Farm Loan">Dairy Farm Loan</option>
            </select>
          </label>
          <span style={{ color: 'red' }}>{errors.serviceType}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Farm Size:
            <input id='applyloan-id' type="text" name="farmSize" value={formData.farmSize} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.farmSize}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Farm Location:
            <input id='applyloan-id' type="text" name="farmLocation" value={formData.farmLocation} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.farmLocation}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Years in Operation:
            <input id='applyloan-id' type="number" name="yearsInOperation" value={formData.yearsInOperation} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.yearsInOperation}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Agricultural Experience:
            <input id='applyloan-id' type="text" name="agriculturalExperience" value={formData.agriculturalExperience} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.agriculturalExperience}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Loan Amount Request:
            <input id='applyloan-id' type="text" name="loanAmountRequest" value={formData.loanAmountRequest} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.loanAmountRequest}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Purpose of Loan:
            <input id='applyloan-id'type="text" name="purposeOfLoan" value={formData.purposeOfLoan} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.purposeOfLoan}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Credit Score:
            <input id='applyloan-id' type="text" name="creditScore" value={formData.creditScore} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.creditScore}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Annual Income from Agriculture:
            <input id='applyloan-id' type="text" name="annualIncomeFromAgriculture" value={formData.annualIncomeFromAgriculture} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.annualIncomeFromAgriculture}</span>
        </div>

        <div id='applyloan-id'>
          <label id='applyloan-id'>
            Other Sources of Income:
            <input id='applyloan-id' type="text" name="otherSourcesOfIncome" value={formData.otherSourcesOfIncome} onChange={handleChange} required />
          </label>
          <span style={{ color: 'red' }}>{errors.otherSourcesOfIncome}</span>
        </div>
        <center>
        <button className='applyloan-button' id='applyloan-id' type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
        </center>
        {messageText && <p className="message">{messageText}</p>}
      </form>
    </div>
    </center>
    <br/><br/>
    </div>
    
    <Footer/>
    
    </>
  );
};

export default ApplyLoan;



/*

*/


