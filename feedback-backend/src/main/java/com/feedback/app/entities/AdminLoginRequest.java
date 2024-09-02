package com.feedback.app.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AdminLoginRequest {


    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;


}

