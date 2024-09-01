package com.feedback.app.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class FeedbackResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long responseId;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.REMOVE) // Cascade delete
    @JoinColumn(name = "question_id")
    private Question question; // Reference to the Question entity

    private Integer emojiValue; // The response value (1 to 5)


}
