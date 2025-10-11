package com.example.springapp.dto.request;



import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NonNull
    private Integer userId;

    @NonNull
    private String firstName;

    @NonNull
    private String lastName;
    
    @NonNull
    private String gender;
    
    @Column(nullable = false)
    private int age;

    @NonNull
    private String emailId;

    @NonNull
    private String password;

    @NonNull
    private String countryCode;

    @Column(nullable = false)
    private long mobile;

    @NonNull
    private String profileImagePath;

    @Column(nullable = true)
    private String otp;
}