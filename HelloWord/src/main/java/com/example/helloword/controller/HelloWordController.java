package com.example.helloword.controller;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWordController {
    @GetMapping("/hello")
    public String helloWord(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String response = "Hello World," + auth.getName() + "!";
        return response;
    }
}
