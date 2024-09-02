package com.feedback.app.controllers;

import com.feedback.app.entities.AdminLoginRequest;
import com.feedback.app.payloads.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    // Hardcoded admin credentials
    private final String adminUsername = "admin";
    private final String adminPassword = "admin123";

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody AdminLoginRequest request) {
        if (adminUsername.equals(request.getUsername()) && adminPassword.equals(request.getPassword())) {
            // If the credentials match
            ApiResponse response = new ApiResponse("Login Successful", true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            // If credentials don't match
            ApiResponse response = new ApiResponse("Invalid credentials", false);
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}