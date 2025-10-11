package com.example.springapp.service;

import java.util.List;

import com.example.springapp.entity.Contact;

public interface ContactService {
    String saveDetails(Contact details);
    String sendSimpleMail(Contact details);
    String sendMailWithAttachment(Contact details);
    List<Contact> getAllContacts();
    String deleteContact(Long contactId);
}
