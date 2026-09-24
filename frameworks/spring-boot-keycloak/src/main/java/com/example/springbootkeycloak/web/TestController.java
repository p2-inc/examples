package com.example.springbootkeycloak.web;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/anonymous")
    public Message anonymous() {
        return new Message("Hello Anonymous");
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('user')")
    public UserMessage user(Authentication authentication) {
        return new UserMessage("Hello Secured with user role.", authentication.getName());
    }

    public record Message(String message) {
    }

    public record UserMessage(String message, String user) {
    }
}
