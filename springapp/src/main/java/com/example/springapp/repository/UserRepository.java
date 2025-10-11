package com.example.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.entity.Users;

import lombok.NonNull;

@Repository
public interface UserRepository extends JpaRepository<Users,Long>{
    Optional<Users> findByEmailId(String emailId);

    boolean existsByEmailId(@NonNull String emailId);

    Optional<String> findEmailIdByUserId(Integer userId);

}

