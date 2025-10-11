package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.entity.GmailDetails;
import com.example.springapp.service.GmailService;


@RestController
@CrossOrigin
public class GmailController {
    @Autowired
    private GmailService gmailService;

    // Sending a simple Email
    @PostMapping("/sendGmail")
    public String sendMail(@RequestBody GmailDetails details) {
        String status = gmailService.sendSimpleMail(details);
        return status;
    }

    // Sending email with attachment
    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(GmailDetails details, MultipartFile attachment) {
        details.setAttachment(attachment);
        String status = gmailService.sendMailWithAttachment(details);
        return status;
    }
}



