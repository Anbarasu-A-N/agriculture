package com.example.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springapp.entity.Loan;
import com.example.springapp.service.LoanService;

@RestController
@RequestMapping("/loanApplications")
public class LoanController {

    @Autowired
    private LoanService loanService;

    // Create - POST
    @PostMapping
    public ResponseEntity<Loan> createLoanApplication(@RequestBody Loan loanApplication) {
        Loan createdLoanApplication = loanService.save(loanApplication);
        return new ResponseEntity<>(createdLoanApplication, HttpStatus.CREATED);
    }

    // Read (All) - GET
    @GetMapping("/GetAll")
    public ResponseEntity<List<Loan>> getAllLoanApplications() {
        List<Loan> loanApplications = loanService.findAll();
        return new ResponseEntity<>(loanApplications, HttpStatus.OK);
    }

    // Read (One by Email) - GET
    @GetMapping("/byEmail/{emailId}")
    public ResponseEntity<List<Loan>> getLoansByEmailId(@PathVariable String emailId) {
        List<Loan> loans = loanService.findByEmailId(emailId);
        if (!loans.isEmpty()) {
            return new ResponseEntity<>(loans, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Read (One) - GET
    @GetMapping("/{id}")
    public ResponseEntity<Loan> getLoanApplicationById(@PathVariable Long id) {
        Loan loanApplication = loanService.findById(id);
        if (loanApplication != null) {
            return new ResponseEntity<>(loanApplication, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update - PUT
    @PutMapping("/AdminUpdate/{id}")
    public ResponseEntity<Loan> updateLoanApplication(@PathVariable Long id,
                                                      @RequestBody Loan updatedLoanApplication) {
        Loan loanApplication = loanService.findById(id);
        if (loanApplication != null) {
            updatedLoanApplication.setId(id);
            Loan savedLoanApplication = loanService.save(updatedLoanApplication);
            return new ResponseEntity<>(savedLoanApplication, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete - DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoanApplication(@PathVariable Long id) {
        Loan loanApplication = loanService.findById(id);
        if (loanApplication != null) {
            loanService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
}
