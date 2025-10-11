package com.example.springapp.service;



import org.springframework.stereotype.Service;

import com.example.springapp.entity.Contact;
import com.example.springapp.repository.ContactRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;


@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public String saveDetails(Contact details) {
        try {
            Contact contact = new Contact();
            contact.setEmailId(details.getEmailId());
            contact.setFirstName(details.getFirstName());
            contact.setLastName(details.getLastName());
            contact.setMsgBody(details.getMsgBody());
            contact.setSubject(details.getSubject());

            contactRepository.save(contact);

            return "Details saved in the database!";
        } catch (Exception e) {
            return "Error while saving details in the database.";
        }
    }

    @Override
    public String sendSimpleMail(Contact details) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getEmailId());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

    @Override
    public String sendMailWithAttachment(Contact details) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getEmailId());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(details.getSubject());

            if (details.getAttachment() != null) {
                File tempFile = File.createTempFile("attachment", details.getAttachment().getOriginalFilename());
                details.getAttachment().transferTo(tempFile);
                mimeMessageHelper.addAttachment(tempFile.getName(), tempFile);
            }

            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        } catch (MessagingException | IOException e) {
            return "Error while sending mail!!!";
        }
    }

    @Override
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @Override
    public String deleteContact(Long contactId) {
        try {
            Optional<Contact> optionalContact = contactRepository.findById(contactId);
            if (optionalContact.isPresent()) {
                contactRepository.deleteById(contactId);
                return "Contact deleted successfully!";
            } else {
                return "Contact not found!";
            }
        } catch (Exception e) {
            return "Error while deleting contact.";
        }
    }
}
