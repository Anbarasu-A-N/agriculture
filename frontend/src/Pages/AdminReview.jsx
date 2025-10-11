

import React, { useEffect, useState } from 'react';
import './AdminReview.css';
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';
import axios from 'axios'; // Import axios

const AdminReview = () => {
  const [reviewDetails, setReviewDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('select');
  const [filteredReviewDetails, setFilteredReviewDetails] = useState([]);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Get userId from localStorage

        const emailId = localStorage.getItem('emailId');
        if (emailId !== 'allsmart.org@gmail.com') {
          window.location.href = '/login';
          return;
        }

        const response = await axios.get(`${BASE_URL}/reviews/showReviews`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: { userId }, // Pass userId as a query parameter
        });

        if (response.status === 200) {
          const data = response.data; // Use response.data directly
          setReviewDetails(data);
          setFilteredReviewDetails(data); // Initially set filtered details to all details
        } else if (response.status === 401) {
          console.error('Unauthorized access');
        } else {
          console.error('Failed to fetch review details');
        }
      } catch (error) {
        console.error('Error fetching review details:', error);
      }
    };

    fetchReviewDetails();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchCategory !== 'select') {
      filterReviewDetails(searchTerm, searchCategory);
    }
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setSearchCategory('select');
    setFilteredReviewDetails(reviewDetails);
  };

  const filterReviewDetails = (term, category) => {
    const filteredDetails = reviewDetails.filter(review => {
      const reviewValue = review[category].toLowerCase();
      return reviewValue.includes(term.toLowerCase());
    });
    setFilteredReviewDetails(filteredDetails);
  };

  return (
    <>
      <AdminNavbar />
      <div id='adminreview' className='adminreviewcontainer'>
        <h1 id='adminreview'>Review Details</h1>
        <div id='adminreview1' className="search-container">
          <label htmlFor="searchCategory" id='adminreview'>Search Category: </label>
          <select
            id='adminreview'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='adminreview' value="select">Select</option>
            <option id='adminreview' value="firstName">First Name</option>
            <option id='adminreview' value="lastName">Last Name</option>
            <option id='adminreview' value="emailId">Email ID</option>
            <option id='adminreview' value="review">Review</option>
            <option id='adminreview' value="reviewScore">Review Score</option>
          </select>
          <label id='adminreview' htmlFor="search">Search: </label>
          <input
            type="text"
            id='adminreview'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='adminreview' onClick={handleSearchClick}>Search</button>
          <button id='adminreview' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='adminreviewtablecontainer'>
          <table id='adminreview'>
            <thead id='adminreview'>
              <tr>
                <th>Review ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Review</th>
                <th>Review Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviewDetails.map(review => (
                <tr key={review.reviewId}>
                  <td>{review.reviewId}</td>
                  <td>{review.firstName}</td>
                  <td>{review.lastName}</td>
                  <td>{review.emailId}</td>
                  <td>{review.review}</td>
                  <td>{review.reviewScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminReview;




/*

import React, { useEffect, useState } from 'react';
import './AdminReview.css';
import AdminNavbar from './AdminNavbar';
import { BASE_URL } from '../Config.jsx';

const AdminReview = () => {
  const [reviewDetails, setReviewDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('select');
  const [filteredReviewDetails, setFilteredReviewDetails] = useState([]);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');
        
        if (emailId !== 'allsmart.org@gmail.com') {
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`${BASE_URL}/reviews/showReviews`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setReviewDetails(data);
          setFilteredReviewDetails(data); // Initially set filtered details to all details
        } else if (response.status === 401) {
          console.error('Unauthorized access');
        } else {
          console.error('Failed to fetch review details');
        }
      } catch (error) {
        console.error('Error fetching review details:', error);
      }
    };

    fetchReviewDetails();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchCategory !== 'select') {
      filterReviewDetails(searchTerm, searchCategory);
    }
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setSearchCategory('select');
    setFilteredReviewDetails(reviewDetails);
  };

  const filterReviewDetails = (term, category) => {
    const filteredDetails = reviewDetails.filter(review => {
      const reviewValue = review[category].toLowerCase();
      return reviewValue.includes(term.toLowerCase());
    });
    setFilteredReviewDetails(filteredDetails);
  };

  return (
    <>
      <AdminNavbar />
      <div id='adminreview' className='adminreviewcontainer'>
        <h1 id='adminreview'>Review Details</h1>
        <div id='adminreview1' className="search-container">
          <label htmlFor="searchCategory" id='adminreview'>Search Category: </label>
          <select
            id='adminreview'
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option id='adminreview' value="select">Select</option>
            <option id='adminreview' value="firstName">First Name</option>
            <option id='adminreview' value="lastName">Last Name</option>
            <option id='adminreview' value="emailId">Email ID</option>
            <option id='adminreview' value="review">Review</option>
            <option id='adminreview' value="reviewScore">Review Score</option>
          </select>
          <label id='adminreview' htmlFor="search">Search: </label>
          <input
            type="text"
            id='adminreview'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id='adminreview' onClick={handleSearchClick}>Search</button>
          <button id='adminreview' onClick={handleClearClick}>Clear</button>
        </div>
        <div className='adminreviewtablecontainer'>
          <table id='adminreview'>
            <thead id='adminreview'>
              <tr>
                <th>Review ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Review</th>
                <th>Review Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviewDetails.map(review => (
                <tr key={review.reviewId}>
                  <td>{review.reviewId}</td>
                  <td>{review.firstName}</td>
                  <td>{review.lastName}</td>
                  <td>{review.emailId}</td>
                  <td>{review.review}</td>
                  <td>{review.reviewScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminReview;


/*
*/