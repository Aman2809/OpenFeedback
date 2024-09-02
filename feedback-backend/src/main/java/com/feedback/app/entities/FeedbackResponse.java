package com.feedback.app.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
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

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // Ensure proper linkage to Feedback
    @JoinColumn(name = "feedback_id")
    @JsonBackReference
    private Feedback feedback;

    @Min(1)
    @Max(5)
    private Integer emojiValue; // The response value (1 to 5)


}