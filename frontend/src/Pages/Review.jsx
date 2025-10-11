
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Review.css';
import StarRatingComponent from 'react-star-rating-component';
import { BASE_URL } from '../Config.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

const Review = () => {
  const token = useSelector(state => state.token); // Access token from Redux store
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState('');
  const [reviewScore, setReviewScore] = useState(0);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();

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
      setIsLoading(false);
    } catch (error) {
      navigate('/login');
    }
  }, [navigate, token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      // Ensure user and user.emailId are not null before making the request
      if (user && user.emailId) {
        const response = await axios.post(`${BASE_URL}/reviews/add`, {
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          review: review,
          reviewScore: reviewScore,
        }, {
          headers: {
            'Authorization': `Bearer ${token}` // Pass the token in the request headers
          },
          params: { userId }, // Add userId as a parameter in the request
        });

        console.log('Review submitted successfully:', response.data);

        setReset(true);
        setTimeout(() => {
          setReview('');
          setReviewScore(0);
          setReset(false);
        }, 5000);
      } else {
        console.error('User or user.emailId is null or undefined.');
      }
    } catch (error) {
      console.error('Failed to submit review:', error.response?.data || error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Navbar />
      <div className='reviewbgcolor'>
      <div className="review-container">
        <h2>Leave a Review</h2>
        <form onSubmit={handleSubmitReview}>
          <label>Review:</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="star-rating">
            <label>Review Score:</label>
            <h1>
              <StarRatingComponent
                name="reviewScore"
                id="reviewscore"
                starCount={10}
                value={reviewScore}
                onStarClick={(value) => setReviewScore(value)}
              />
            </h1>
          </div>
          <div className="autofilled-info">
            <h4>First Name: &nbsp;&nbsp;&nbsp;{user ? user.firstName : ''}</h4>
            <h4>Last Name: &nbsp;&nbsp;&nbsp;&nbsp;{user ? user.lastName : ''}</h4>
            <h4>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {user ? user.emailId : ''}</h4>
          </div>
          <button type="submit" className={reset ? 'reset-button' : ''}>
            {reset ? 'Review Submitted!' : 'Submit Review'}
          </button>
        </form>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;



/*

*/