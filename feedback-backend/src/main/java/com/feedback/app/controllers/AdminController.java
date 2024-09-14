package com.feedback.app.controllers;

import com.feedback.app.entities.AdminLoginRequest;
import com.feedback.app.payloads.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    // Hardcoded admin credentials
    private final String adminUsername = "admin";
    private final String adminPassword = "admin123";

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody AdminLoginRequest request, HttpSession session) {
        if (adminUsername.equals(request.getUsername()) && adminPassword.equals(request.getPassword())) {
            // If credentials match, save admin to session
            session.setAttribute("admin", request.getUsername());
            ApiResponse response = new ApiResponse("Login Successful", true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ApiResponse response = new ApiResponse("Invalid credentials", false);
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpSession session) {
        session.invalidate();
        ApiResponse response = new ApiResponse("Logout Successful", true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
