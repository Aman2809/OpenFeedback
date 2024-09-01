package com.feedback.app.service;

import com.feedback.app.entities.Feedback;

import java.util.List;

public interface FeedbackService {
    Feedback saveFeedback(Feedback feedback);
    List<Feedback> findAll();
    Feedback findById(int id);
    void deleteById(int id);
    Feedback updateFeedback(Feedback feedback);

}
