package com.example.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.entity.Contact;
import com.example.springapp.service.ContactService;
    


@RestController
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/sendMailWithAttachmentAndSave")
    public String sendMailWithAttachmentAndSave(@RequestPart("emailId") String emailId,
                                                @RequestPart("firstName") String firstName,
                                                @RequestPart("lastName") String lastName,
                                                @RequestPart("subject") String subject,
                                                @RequestPart("msgBody") String msgBody,
                                                @RequestPart(value = "attachment", required = false) MultipartFile attachment) {

        // Create a new Portfolio instance and set its properties
        Contact details = new Contact();
        details.setEmailId(emailId);
        details.setFirstName(firstName);
        details.setLastName(lastName);
        details.setSubject(subject);
        details.setMsgBody(msgBody);
        details.setAttachment(attachment);

        // Send mail with attachment
        String emailStatus = contactService.sendMailWithAttachment(details);

        // Save details in the database using the saveDetails method
        String saveStatus = contactService.saveDetails(details);

        // You might want to return a combined status or handle it based on your requirements
        return "Email Status: " + emailStatus + "\nSave Status: " + saveStatus;
    }

    @GetMapping("/AdminGetAllContacts")
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    @DeleteMapping("/deleteContact/{contactId}")
    public String deleteContact(@PathVariable Long contactId) {
        return contactService.deleteContact(contactId);
    }
}