package com.example.springapp.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.entity.Loan;
import com.example.springapp.repository.LoanRepository;

@Service
public class LoanService {

    @Autowired
    private LoanRepository repository;

    public Loan save(Loan loanApplication) {
        return repository.save(loanApplication);
    }

    public List<Loan> findAll() {
        return repository.findAll();
    }

    public List<Loan> findByEmailId(String emailId) {
        return repository.findByEmailId(emailId);
    }

    public Loan findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    // Add more service methods if needed
}