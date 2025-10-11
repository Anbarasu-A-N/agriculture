package com.example.springapp.service;

import com.example.springapp.dto.request.LoginRequest;
import com.example.springapp.dto.request.RegisterRequest;
import com.example.springapp.dto.response.LoginResponse;
import com.example.springapp.dto.response.RegisterResponse;
import com.example.springapp.entity.Users;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.utils.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @Override
    public RegisterResponse register(RegisterRequest request) {
        // Initialize RegisterResponse
        RegisterResponse response = new RegisterResponse();

        // Check if email already exists
        if (userRepository.existsByEmailId(request.getEmailId())) {
            // Set error message if email already exists
            response.setMessage("Email already exists!");
            return response;
        }

        Users newUser = Users.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .gender(request.getGender())
                .age(request.getAge())
                .emailId(request.getEmailId())
                .password(passwordEncoder.encode(request.getPassword())) // Encode password
                .countryCode(request.getCountryCode())
                .mobile(request.getMobile())
                .role(com.example.springapp.enumerated.Role.USER) // Role User
                .build();

        userRepository.save(newUser);

        return RegisterResponse.builder()
                .message("User registered successfully")
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmailId(), request.getPassword()));

            // Fetch user details
            Users user = userRepository.findByEmailId(request.getEmailId())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            System.out.println("User details fetched from the database: " + user.toString()); // Add this line

            // Generate JWT token
            String token = jwtUtil.generateToken(user);

            return LoginResponse.builder()
                    .message("Logged in successfully.")
                    .token(token)
                    .build();
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password!");
        }
    }
}



/*

package com.example.springapp.service;

import com.example.springapp.dto.request.LoginRequest;
import com.example.springapp.dto.request.RegisterRequest;
import com.example.springapp.dto.response.LoginResponse;
import com.example.springapp.dto.response.RegisterResponse;
import com.example.springapp.entity.Users;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.utils.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @Override
    public RegisterResponse register(RegisterRequest request) {
        // Initialize RegisterResponse
        RegisterResponse response = new RegisterResponse();

        // Check if email already exists
        if (userRepository.existsByEmailId(request.getEmailId())) {
            // Set error message if email already exists
            response.setMessage("Email already exists!");
            return response;
        }

        Users newUser = Users.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .gender(request.getGender())
                .age(request.getAge())
                .emailId(request.getEmailId())
                .password(passwordEncoder.encode(request.getPassword())) // Encode password
                .countryCode(request.getCountryCode())
                .mobile(request.getMobile())
                .role(com.example.springapp.enumerated.Role.USER) // Role User
                .build();

        userRepository.save(newUser);

        return RegisterResponse.builder()
                .message("User registered successfully")
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmailId(), request.getPassword()));

            // Fetch user details
            Users user = userRepository.findByEmailId(request.getEmailId())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            System.out.println("User details fetched from the database: " + user.toString()); // Add this line

            // Generate JWT token
            String token = jwtUtil.generateToken(user);

            return LoginResponse.builder()
                    .message("Logged in successfully.")
                    .token(token)
                    .build();
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password!");
        }
    }
}


/* */