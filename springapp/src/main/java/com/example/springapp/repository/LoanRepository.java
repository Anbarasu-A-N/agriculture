package com.example.springapp.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entity.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByEmailId(String emailId);
    
}