package com.example.springapp.controller;

import com.example.springapp.entity.Review;
import com.example.springapp.service.ReviewService;

import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@CrossOrigin
public class ReviewController {

    private final ReviewService reviewService;

    //@Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // POST mapping to add a new review
    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        Review newReview = reviewService.addReview(review);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

   
    
    @GetMapping("/showReviews")
    public ResponseEntity<List<Review>> fetchDetails() {
        List<Review> products = reviewService.getDetails();
        return ResponseEntity.ok(products);
    }
}
