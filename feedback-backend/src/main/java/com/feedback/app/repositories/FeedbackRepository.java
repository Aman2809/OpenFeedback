package com.feedback.app.repositories;

import com.feedback.app.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

    // Finding each Feedback with the sessionId
    Feedback findBySessionId(UUID sessionId);
}
