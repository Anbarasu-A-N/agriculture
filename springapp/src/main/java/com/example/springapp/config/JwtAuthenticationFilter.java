package com.example.springapp.config;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.springapp.utils.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader(AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = authHeader.substring(7);
        String userEmail = jwtUtil.extractUsername(token);
        Integer userId = jwtUtil.extractUserId(token);
        String requestEmail = request.getParameter("emailId");
        String userIdStr = request.getParameter("userId");

        System.out.println("User ID from token: " + userId);
        System.out.println("User ID from request: " + userIdStr);

        // If emailId is provided in the request
        if (requestEmail != null && !requestEmail.isEmpty()) {
            if (userEmail != null && userEmail.equals(requestEmail)) {
                if (jwtUtil.isTokenValid(token, userEmail, userId)) {
                    System.out.println("Token validation successful");
                    SecurityContextHolder.getContext().setAuthentication(jwtUtil.getAuthentication(token, null));
                    filterChain.doFilter(request, response);
                } else {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized access");
                }
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized access");
            }
        } 
        // If userId is provided in the request
        else if (userIdStr != null && !userIdStr.isEmpty()) {
            try {
                Integer requestedUserId = Integer.parseInt(userIdStr);
                if (userId != null && userId.equals(requestedUserId)) {
                    if (jwtUtil.isTokenValid(token, userEmail, userId)) {
                        System.out.println("Token validation successful");
                        SecurityContextHolder.getContext().setAuthentication(jwtUtil.getAuthentication(token, null));
                        filterChain.doFilter(request, response);
                    } else {
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized access");
                    }
                } else {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized access");
                }
            } catch (NumberFormatException e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid userId format");
            }
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Either emailId or userId must be provided");
        }
    }
}







/*

package com.example.springapp.config;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import java.io.IOException;


import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.springapp.service.UserService;
import com.example.springapp.utils.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader(AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = authHeader.substring(7);
        String userEmail = jwtUtil.extractUserEmail(token);
        String requestEmail = request.getParameter("emailId");
        String userIdStr = request.getParameter("userId");
        
        // If emailId is provided in the request
        if (requestEmail != null && !requestEmail.isEmpty()) {
            if (userEmail != null && userEmail.equals(requestEmail)) {
                if (jwtUtil.isTokenValid(token, userEmail)) {
                    SecurityContextHolder.getContext().setAuthentication(jwtUtil.getAuthentication(token, null));
                }
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized access");
                return;
            }
        } 
        // If userId is provided in the request
        else if (userIdStr != null && !userIdStr.isEmpty()) {
            try {
                Integer userId = Integer.parseInt(userIdStr);
                String userEmailFromUserId = userService.findEmailIdByUserId(userId).orElse(null);
                if (userEmailFromUserId != null && userEmailFromUserId.equals(userEmail)) {
                    if (jwtUtil.isTokenValid(token, userEmail)) {
                        SecurityContextHolder.getContext().setAuthentication(jwtUtil.getAuthentication(token, null));
                    }
                } else {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized access");
                    return;
                }
            } catch (NumberFormatException e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid userId format");
                return;
            }
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Either emailId or userId must be provided");
            return;
        }
        filterChain.doFilter(request, response);
    }
}

/* */

/*



package com.example.springapp.config;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import java.io.IOException;


import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.springapp.utils.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader(AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = authHeader.substring(7);
        String userEmail = jwtUtil.extractUserEmail(token);
        String requestEmail = request.getParameter("emailId");
        if (userEmail != null && userEmail.equals(requestEmail)) {
            if (jwtUtil.isTokenValid(token, userEmail)) {
                SecurityContextHolder.getContext().setAuthentication(jwtUtil.getAuthentication(token, null));
            }
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized access");
            return;
        }
        filterChain.doFilter(request, response);
    }
}


/* */

/* 



package com.example.springapp.config;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.springapp.utils.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader(AUTHORIZATION);
        final String token;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        token = authHeader.substring(7);
        userEmail = jwtUtil.extractUsername(token);
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if (jwtUtil.isTokenValid(token, userDetails)) {
                SecurityContextHolder.getContext().setAuthentication(jwtUtil.getAuthentication(token, userDetails));
            }
        }
        filterChain.doFilter(request, response);
    }
}


/*
 * 
 */