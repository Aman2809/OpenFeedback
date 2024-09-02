package com.feedback.app.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "questions")
@Getter
@Setter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column
    @NotEmpty(message = "Question cant be Null !! ")
    private String questionText;

    @Column
    private boolean isActive;
}
