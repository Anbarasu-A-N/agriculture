package com.example.springapp.service;

import com.example.springapp.entity.GmailDetails;

public interface GmailService {
    // Method to send a simple email
    String sendSimpleMail(GmailDetails details);

    // Method to send an email with attachment
    String sendMailWithAttachment(GmailDetails details);
}
