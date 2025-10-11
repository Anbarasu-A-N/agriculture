import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./Support.css";
import { BASE_URL } from '../Config.jsx';
import Footer from './Footer';
import Navbar from './Navbar';
import Support from "./Images/support.png";
import Support2 from "./Images/support2.png";
import Support3 from "./Images/support3.png";
import Support1 from "./Images/customer_support.png";

function SupportCenter() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    phone: '',
    category: '',
    description: '',
    priorityLevel: ''
  });

  const [submitMessage, setSubmitMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/support`, formData);
      setSubmitMessage('Support request submitted successfully!');
      setErrorMessage('');
      console.log('Support request submitted successfully:', response.data);
      // You can add additional logic or UI updates here
    } catch (error) {
      setSubmitMessage('');
      setErrorMessage('Error submitting support request. Please try again.');
      console.error('Error submitting support request:', error);
      // Handle errors and update UI accordingly
    }
  };

  const images = [
    Support,
    Support1,
    Support2,
    Support3,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const changeImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const intervalId = setInterval(changeImage, 2000);

    return () => clearInterval(intervalId);
  }, [changeImage]);

  return (
    <>
    <Navbar/>
    <center>
      <div className='support-fullpage'>
        <div className='support-first'>

        </div>
    <div className="support-container">
      <h1 id='support' >Support Center</h1>
      <form  id='support' onSubmit={handleSubmit}>
        <label id='support'>
          First Name:
          <input id='support'type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>

        <label id='support'>
          Last Name:
          <input id='support'type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>

        <label id='support'>
          Email:
          <input id='support'type="email" name="emailId" value={formData.emailId} onChange={handleChange} required />
        </label>

        <label id='support'>
          Phone:
          <input id='support'type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label id='support'>
          Category:
          <select  id='support' name="category" value={formData.category} onChange={handleChange} required>
            <option id='support' value="">Select Category</option>
            <option id='support' value="Technical Support">Technical Support</option>
            <option id='support' value="Loan Issue">Loan Issue</option>
            <option id='support' value="General Inquiry">General Inquiry</option>
          </select>
        </label>

        <label id='support'>
          Priority Level:
          <select id='support' name="priorityLevel" value={formData.priorityLevel} onChange={handleChange} required>
            <option id='support' value="">Select Priority Level</option>
            <option id='support' value="Low">Low</option>
            <option id='support' value="Medium">Medium</option>
            <option id='support' value="High">High</option>
          </select>
        </label>

        <label id='support'>
          Description:
        </label>
        <textarea id='support' name="description" value={formData.description} onChange={handleChange} required />

        <button id='support' type="submit">Submit</button>

        {submitMessage && <p id='support' style={{ color: 'green', marginTop: '10px' }}>{submitMessage}</p>}
        {errorMessage && <p id='support' style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
      </form>
    </div>
    <div className='supportdisplayimg'>
        <center>
        <img
          id='displayimg'
          style={{ width: '750px', height: 'auto',marginTop:'100px' }}
          src={images[currentIndex]}
          alt={`#${currentIndex + 1}`}
        />
        </center>
      </div>
    </div>
    </center>
    <Footer/>
    </>
  );
}

export default SupportCenter;
