package com.example.springapp.repository;

import com.example.springapp.entity.Contact;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository  extends JpaRepository<Contact, Long> {
    List<Contact> findByEmailId(String emailId);
}