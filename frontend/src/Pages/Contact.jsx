

import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import Plant from "./Images/plant.png";
import ProfileMan from "./Images/man.png";
import Footer from './Footer';
import Navbar from './Navbar';
import { BASE_URL } from '../Config.jsx';

const Contact = () => {
  const navigate = useNavigate();
  const token = useSelector(state => state.token); // Access token from Redux store
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [includeAttachment, setIncludeAttachment] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState('');

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
      setLoading(false);
    } catch (error) {
      navigate('/login');
    }
  }, [navigate, token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleIncludeAttachmentChange = () => {
    setIncludeAttachment(!includeAttachment);
    if (!includeAttachment) {
      setAttachment(null);
    }
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
    } else {
      setAttachment(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your email validation logic here if needed

    const formData = new FormData();
    formData.append('emailId', user ? user.emailId : '');  // Updated: Use 'emailId' instead of 'recipient'
    formData.append('firstName', user ? user.firstName : '');
    formData.append('lastName', user ? user.lastName : '');
    formData.append('subject', subject);
    formData.append('msgBody', message);

    if (includeAttachment && attachment) {
      formData.append('attachment', attachment);
    }

    setLoading(true);
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    axios.post(`${BASE_URL}/sendMailWithAttachmentAndSave`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` // Pass the token in the request headers
      },
      params: { userId }, // Pass userId as a query parameter only for POST method
    })
      .then((response) => {
        console.log(response.data);
        setMessageText('Email sent successfully!');
        setSubject('');
        setMessage('');
        setIncludeAttachment(false);
        setAttachment(null);
      })
      .catch((error) => {
        console.error(error);
        setMessageText('Error while sending email.');
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setMessageText('');
        }, 5000);
      });
  };

  return (
    <>
    <Navbar/>
    <div className="body1">
      <div className='contact-first'>
        <center>
          <img src={Plant} alt="ProfileGirl" style={{ width: '450px', height: '550px', paddingTop: '100px', marginRight: '30px' }} />
        </center>
      </div>
      <div className="contact-form">
        <h2 id='contact'>Contact Us</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="autofilled-info">
              <h4>First Name: &nbsp;&nbsp;&nbsp;{user ? user.firstName : ''}</h4>
              <h4>Last Name: &nbsp;&nbsp;&nbsp;&nbsp;{user ? user.lastName : ''}</h4>
              <h4>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {user ? user.emailId : ''}</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id='contact'
              value={subject}
              onChange={handleSubjectChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id='contact'
              value={message}
              onChange={handleMessageChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="includeAttachment">Include Attachment:</label>
            <input
              type="checkbox"
              id="includeAttachment"
              checked={includeAttachment}
              onChange={handleIncludeAttachmentChange}
            />
          </div>
          {includeAttachment && (
            <div className="form-group">
              <label htmlFor="attachment">Attachment (optional):</label>
              <input
                type="file"
                id="attachment"
                onChange={handleAttachmentChange}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
            </div>
          )}
          <button id='contact' type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Gmail'}
          </button>
          <h6 id='contact'>(Note): This Email is sent to your Email ID by using My Gmail ID.</h6>
          {messageText && <p className="message">{messageText}</p>}
        </form>
      </div>
      <div className='contact-end'>
        <center>
          <img src={ProfileMan} alt="Profile1" style={{ width: '300px', height: '550px', paddingTop: '100px'}} />
        </center>
      </div>
    </div>
    <Footer/>

    </>
  );
};

export default Contact;


/*

*/