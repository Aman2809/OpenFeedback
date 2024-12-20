package com.feedback.app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "feedbacks")
@Getter
@Setter
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    @Column(nullable = false , unique = true)
    private UUID sessionId;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "feedback_id")
    @JsonManagedReference
    private List<FeedbackResponse> responses; // List of responses, each linked to a Question

    @OneToOne(mappedBy = "feedback", cascade = CascadeType.ALL)
    @JsonManagedReference
    private UserDeviceInfo userDeviceInfo;

    public Feedback() {
        this.sessionId = UUID.randomUUID();
        this.createdAt = LocalDateTime.now();
    }


}