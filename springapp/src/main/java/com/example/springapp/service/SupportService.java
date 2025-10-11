package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.entity.Support;
import com.example.springapp.repository.SupportRepository;

import java.util.List;

@Service
public class SupportService {
    @Autowired
    private SupportRepository supportRepository;

    public List<Support> getAllSupport() {
        return supportRepository.findAll();
    }

    public Support saveSupport(Support support) {
        return supportRepository.save(support);
    }
}
