package com.Project.Backend.service;

import com.Project.Backend.model.UserCred;
import com.Project.Backend.repository.UserCredRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserCredRepository userCredRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserCred addUser(UserCred userCred) {

        if(userCredRepository.existsByEmail(userCred.getEmail())){
            throw new RuntimeException("Email Already Exists!");
        }

        userCred.setPassword(passwordEncoder.encode(userCred.getPassword()));
        return userCredRepository.save(userCred);
    }
}
