package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entity.Support;

public interface SupportRepository extends JpaRepository<Support, Long> {
    // You can add custom query methods if needed
}
