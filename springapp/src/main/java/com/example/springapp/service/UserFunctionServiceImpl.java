

package com.example.springapp.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.example.springapp.entity.Users;
import com.example.springapp.repository.UserFunctionRepository;

@Service
public class UserFunctionServiceImpl implements UserFunctionService {

    @Autowired
    private UserFunctionRepository userFunctionRepository;

    @Override
    public void userFunction(Users userFunction) {
        userFunctionRepository.save(userFunction);
    }



    @Override
    public List<Users> getDetails() {
        return userFunctionRepository.findAll();
    }

    @Override
    public void deleteUser(Users userFunction) {
        userFunctionRepository.delete(userFunction);
    }

    @Override
    public Users findByEmailId(String emailId) {
        return userFunctionRepository.findByEmailId(emailId);
    }

    @Override
    public void changePassword(String emailId, String oldPassword, String newPassword) {
        Users userFunction = userFunctionRepository.findByEmailIdAndPassword(emailId, oldPassword);

        if (userFunction != null) {
            userFunction.setPassword(newPassword);
            userFunctionRepository.save(userFunction);
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }

    @Override
    public Users getUserByEmailId(String emailId) {
        return userFunctionRepository.findByEmailId(emailId);
    }

    public boolean isEmailIdExists(String emailId) {
        return userFunctionRepository.existsByEmailId(emailId);
    }


  
    
    @Override
    public Users login(String emailId, String password) {
        // Fetch the user by email
        Users userFunction = userFunctionRepository.findByEmailId(emailId);

        // Check if the user exists and the passwords match (case-sensitive)
        if (userFunction != null && password.equals(userFunction.getPassword())) {
            return userFunction;
        } else {
            return null;
        }
    }
    


    @Override
    public boolean isEmailIdExists(String emailId, String currentEmailId) {
        if (!emailId.equals(currentEmailId)) {
            // Check if the new emailId already exists
            return userFunctionRepository.existsByEmailId(emailId);
        }
        return false;
    }


    public Users loginUser(String emailId, String password) {
        // Find the user by email
        Users existingUser = userFunctionRepository.findByEmailId(emailId);
        if (existingUser == null || !existingUser.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid email ID or password");
        }

        return existingUser;
    }








        
    @Override
    public void sendOtp(String emailId) {
        Users user = userFunctionRepository.findByEmailId(emailId);

        if (user != null) {
            // Generate OTP
            String otp = generateOtp();
            user.setOtp(otp);
            userFunctionRepository.save(user);

            // Send OTP via email
            sendOtpEmail(user.getEmailId(), otp);
        }
    }
    
    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public boolean verifyOtp(String emailId, String otp) {
        Users user = userFunctionRepository.findByEmailId(emailId);

        return user != null && user.getOtp() != null && user.getOtp().equals(otp);
    }

    private void sendOtpEmail(String emailId, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailId);
        message.setSubject("OTP for Password Reset");
        message.setText("Your OTP for password reset is: " + otp);

        javaMailSender.send(message);
    }


    private String generateOtp() {
        // Generate a 6-digit random OTP
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }



    @Override
    public Users loginUser(Users loginRequest) {
        // todo Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loginUser'");
    }



}

/* */