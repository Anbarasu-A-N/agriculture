

package com.example.springapp.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.springapp.entity.Users;
import com.example.springapp.enumerated.Role;
import com.example.springapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserCLI implements CommandLineRunner {

    private final UserRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Only insert if table is empty
        if (usersRepository.count() > 0) {
            return;
        }

        Users user = Users.builder()
                // Remove userId - let PostgreSQL auto-generate it
                .firstName("Allsmart Admin")
                .lastName("Access")
                .age(22)
                .emailId("projectdevopsx@gmail.com")
                .password(passwordEncoder.encode("Devops@*#123"))
                .gender("Male")
                .countryCode("+91")
                .mobile(6382797079L)
                .profileImagePath("Allsmart.jpg")
                .role(Role.ADMIN)
                .build();

        usersRepository.save(user);
        System.out.println("Admin user inserted successfully!");
    }
}



/*

package com.example.springapp.config;




import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.springapp.entity.Users;
import com.example.springapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
//@SuppressWarnings("null")
public class UserCLI implements CommandLineRunner {

    private final UserRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (usersRepository.count() > 0)
            return;
        var user = Users.builder()
                .userId(1)
                .firstName("Allsmart Admin")
                .lastName("Access")
                .age(22)
                .emailId("projectdevopsx@gmail.com")
                .password(passwordEncoder.encode("Devops@*#123"))
                .gender("Male")
                .otp(null)
                .profileImagePath("Allsmart.jpg")
                .countryCode("+91")
                .mobile(6382797079L)
                .role(com.example.springapp.enumerated.Role.ADMIN)
                .build();
        usersRepository.save(user);
    }

}







/*
package com.example.springapp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.springapp.entity.Admin;
import com.example.springapp.enumerated.Role;
import com.example.springapp.repository.AdminRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserCLI implements CommandLineRunner {

    private final AdminRepository adminRepository; // Inject AdminRepository instead of UserRepository
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        if (adminRepository.count() > 0) // Use adminRepository here
            return;
        var admin = Admin.builder()
                .adminUsername(adminUsername)
                .adminPassword(passwordEncoder.encode(adminPassword))
                .role(Role.ADMIN) // Set admin role
                .build();
        adminRepository.save(admin); // Use adminRepository to save admin entity
    }
}

/*
 * 
 */