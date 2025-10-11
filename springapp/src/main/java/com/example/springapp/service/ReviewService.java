package com.example.springapp.service;

import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.entity.Review;
import com.example.springapp.repository.ReviewRepository;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    //@Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // Service method to add a new review
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    // Service method to get reviews by emailId
    public List<Review> findByEmailId(String emailId) {
        return reviewRepository.findByEmailId(emailId);
    }
    
    // Service method to get all reviews
    public List<Review> getDetails() {
        return reviewRepository.findAll();
    }
}
