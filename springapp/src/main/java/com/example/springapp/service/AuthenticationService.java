package com.example.springapp.service;

import com.example.springapp.dto.request.LoginRequest;
import com.example.springapp.dto.request.RegisterRequest;
import com.example.springapp.dto.response.LoginResponse;
import com.example.springapp.dto.response.RegisterResponse;

public interface AuthenticationService {
    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
}