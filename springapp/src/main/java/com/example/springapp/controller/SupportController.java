package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.springapp.entity.Support;
import com.example.springapp.service.SupportService;

import java.util.List;

@RestController
@RequestMapping("/support")
@CrossOrigin
public class SupportController {
    
    @Autowired
    private SupportService supportService;

    @GetMapping
    public List<Support> getAllSupport() {
        return supportService.getAllSupport();
    }

    @PostMapping
    public Support createSupport(@RequestBody Support support) {
        return supportService.saveSupport(support);
    }
}
