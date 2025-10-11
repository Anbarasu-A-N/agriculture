package com.example.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.entity.Users;
import com.example.springapp.repository.UserRepository;



@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
     
     
     //@SuppressWarnings("null")
     public boolean AddUser(Users ue)
     {
          userRepository.save(ue);
          return true;
     }
     public List<Users> getUser()
     {
          return userRepository.findAll();
     }
     

     public Optional<String> findEmailIdByUserId(Integer userId) {
          return userRepository.findEmailIdByUserId(userId);
     }
}