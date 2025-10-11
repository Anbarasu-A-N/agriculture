
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminContactUs.css";
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';

const AdminContactUs = () => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [includeAttachment, setIncludeAttachment] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                const emailId = localStorage.getItem('emailId');
                if (emailId !== 'allsmart.org@gmail.com') {
                    window.location.href = '/login';
                } else {
                    setToken(token);
                }
            } catch (error) {
                console.error('Error checking authorization:', error);
            }
        };
        checkAuthorization();
    }, []);

    const handleRecipientChange = (e) => {
      setRecipient(e.target.value);
    };
  
    const handleSubjectChange = (e) => {
      setSubject(e.target.value);
    };
  
    const handleMessageChange = (e) => {
      setMessage(e.target.value);
    };
  
    const handleIncludeAttachmentChange = () => {
      setIncludeAttachment(!includeAttachment);
      // Reset the attachment when toggling the "OR" option off
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
  
      const formData = new FormData();
      formData.append('recipient', recipient);
      formData.append('subject', subject);
      formData.append('msgBody', message);
  
      if (includeAttachment && attachment) {
        formData.append('attachment', attachment);
      }
  
      setLoading(true);

      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      axios.post(`${BASE_URL}/sendMailWithAttachment`, formData, {
          headers: {
              'Authorization': `Bearer ${token}`
          },
          params: { userId }, // Add userId as a parameter in the request
      })
        .then((response) => {
          console.log(response.data);
          setMessageText('Email sent successfully!');
          // Reset form fields
          setRecipient('');
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
          // Clear the message after a few seconds
          setTimeout(() => {
            setMessageText('');
          }, 5000);
        });
    };
  
    return (
        <>
        <AdminNavbar></AdminNavbar>
        <br />
      <div className="adminemail-form">
        <h2 id='adminemail'>Send Gmail To Customer</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="adminform-group">
            <label id='adminemail' htmlFor="recipient">Recipient:</label>
            <input
              type="email"
              id='adminemail'
              value={recipient}
              onChange={handleRecipientChange}
              required
            />
          </div>
  
          <div className="adminform-group">
            <label id='adminemail' htmlFor="subject">Subject:</label>
            <input
              type="text"
              id='subject'
              className='adminemailsubject'
              value={subject}
              onChange={handleSubjectChange}
              required
            />
          </div>
  
          <div className="adminform-group">
            <label id='adminemail' htmlFor="message">Message:</label>
            <textarea
              id='adminemail'
              value={message}
              onChange={handleMessageChange}
              required
            ></textarea>
          </div>
  
          <div className="adminform-group">
            <label id='adminemail' htmlFor="includeAttachment">Include Attachment:</label>
            <input
              type="checkbox"
              id='adminemail1'
              checked={includeAttachment}
              onChange={handleIncludeAttachmentChange}
            />
          </div>
  
          {includeAttachment && (
            <div className="adminform-group">
              <label id='adminemail' htmlFor="attachment">Attachment (optional):</label>
              <input
                type="file"
                id='adminemail'
                onChange={handleAttachmentChange}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
            </div>
          )}
  
          <button type="submit" id='adminemail' disabled={loading}>
            {loading ? 'Sending...' : 'Send Gmail'}
          </button>
          {messageText && <p className="message">{messageText}</p>}
        </form>
      </div>
      </>
    );
};

export default AdminContactUs;



/*

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminContactUs.css";
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';

const AdminContactUs = () => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [includeAttachment, setIncludeAttachment] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                const emailId = localStorage.getItem('emailId');
                if (emailId !== 'allsmart.org@gmail.com') {
                    window.location.href = '/login';
                } else {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Error checking authorization:', error);
            }
        };
        checkAuthorization();
    }, []);

    const handleRecipientChange = (e) => {
      setRecipient(e.target.value);
    };
  
    const handleSubjectChange = (e) => {
      setSubject(e.target.value);
    };
  
    const handleMessageChange = (e) => {
      setMessage(e.target.value);
    };
  
    const handleIncludeAttachmentChange = () => {
      setIncludeAttachment(!includeAttachment);
      // Reset the attachment when toggling the "OR" option off
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
  
      const formData = new FormData();
      formData.append('recipient', recipient);
      formData.append('subject', subject);
      formData.append('msgBody', message);
  
      if (includeAttachment && attachment) {
        formData.append('attachment', attachment);
      }
  
      setLoading(true);
      axios.post(`${BASE_URL}/sendMailWithAttachment`, formData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
        .then((response) => {
          console.log(response.data);
          setMessageText('Email sent successfully!');
          // Reset form fields
          setRecipient('');
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
          // Clear the message after a few seconds
          setTimeout(() => {
            setMessageText('');
          }, 5000);
        });
    };
  
    return (
        <>
        <AdminNavbar></AdminNavbar>
        <br />
      <div className="adminemail-form">
        <h2 id='adminemail'>Send Gmail To Customer</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="adminform-group">
            <label id='adminemail' htmlFor="recipient">Recipient:</label>
            <input
              type="email"
              id='adminemail'
              value={recipient}
              onChange={handleRecipientChange}
              required
            />
          </div>
  
          <div className="adminform-group">
            <label id='adminemail' htmlFor="subject">Subject:</label>
            <input
              type="text"
              id='subject'
              className='adminemailsubject'
              value={subject}
              onChange={handleSubjectChange}
              required
            />
          </div>
  
          <div className="adminform-group">
            <label id='adminemail' htmlFor="message">Message:</label>
            <textarea
              id='adminemail'
              value={message}
              onChange={handleMessageChange}
              required
            ></textarea>
          </div>
  
          <div className="adminform-group">
            <label id='adminemail' htmlFor="includeAttachment">Include Attachment:</label>
            <input
              type="checkbox"
              id='adminemail1'
              checked={includeAttachment}
              onChange={handleIncludeAttachmentChange}
            />
          </div>
  
          {includeAttachment && (
            <div className="adminform-group">
              <label id='adminemail' htmlFor="attachment">Attachment (optional):</label>
              <input
                type="file"
                id='adminemail'
                onChange={handleAttachmentChange}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
            </div>
          )}
  
          <button type="submit" id='adminemail' disabled={loading}>
            {loading ? 'Sending...' : 'Send Gmail'}
          </button>
          {messageText && <p className="message">{messageText}</p>}
        </form>
      </div>
      </>
    );
};

export default AdminContactUs;


/*
*/