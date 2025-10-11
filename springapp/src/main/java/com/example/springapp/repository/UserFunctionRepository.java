
package com.example.springapp.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.entity.Users;

@Repository
public interface UserFunctionRepository extends JpaRepository<Users, Integer> {
	
    Users findByEmailIdAndPassword(String emailId, String password);
    Users findByEmailId(String emailId);
    boolean existsByEmailId(String emailId);
    Optional<Users> findById(Integer userId);

}


