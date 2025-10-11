package com.example.springapp.repository;

import com.example.springapp.entity.Review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    // You can add custom query methods here if needed
    List<Review> findByEmailId(String emailId);
}
