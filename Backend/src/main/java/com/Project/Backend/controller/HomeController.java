package com.Project.Backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String Home(){
        return "Hello Yash";
    }

    @GetMapping("/secure")
    public String Secure(){
        return "Hello This is Secure";
    }
}
