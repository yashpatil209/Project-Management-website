package com.Project.Backend.controller;

import com.Project.Backend.model.UserCred;
import com.Project.Backend.repository.UserCredRepository;
import com.Project.Backend.service.JwtService;
import com.Project.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserCredRepository userCredRepository;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserCred userCred){
        UserCred userCred1 = null;
        try {
            userCred1 =  userService.addUser(userCred);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(userCred1 , HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserCred userCred){
        UserCred userCred1 = userCredRepository.findByEmail(userCred.getEmail());
        Map<String, Object> response = new HashMap<>();

        if (userCred1 == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userCred.getEmail(), userCred.getPassword()));

        String jwtToken = "";
        if(authentication.isAuthenticated()) {
            jwtToken = jwtService.generateToken(userCred.getEmail());
            response.put("token", jwtToken);
            response.put("user", userCred1);
            return new ResponseEntity<>(response , HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
