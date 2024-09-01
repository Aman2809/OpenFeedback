package com.feedback.app.service;

import com.feedback.app.entities.Feedback;

import java.util.List;
import java.util.UUID;

public interface FeedbackService {

    Feedback addFeedback(Feedback feedback);
    Feedback updateFeedback(Feedback feedback,Long feedbackId);
    Feedback findById(Long feedbackId);
    Feedback findBySessionId(UUID sessionId);
    List<Feedback> findAll();

    void deleteById(Long feedbackId);

}
