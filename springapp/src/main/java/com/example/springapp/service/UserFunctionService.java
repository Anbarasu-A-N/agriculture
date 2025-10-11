

package com.example.springapp.service;

import java.util.List;

import com.example.springapp.entity.Users;

public interface UserFunctionService {

    void userFunction(Users userFunction);

    Users login(String emailId, String password);

    Users loginUser(String emailId, String password);

    Users loginUser(Users loginRequest);

    List<Users> getDetails();

    void deleteUser(Users userFunction);

    boolean isEmailIdExists(String emailId);
    
    Users findByEmailId(String emailId);
    
    void changePassword(String emailId, String oldPassword, String newPassword);

	Users getUserByEmailId(String emailId);

    void sendOtp(String emailId);

    boolean verifyOtp(String emailId, String otp);
	
    boolean isEmailIdExists(String emailId, String currentEmailId);

    

}

/* */
