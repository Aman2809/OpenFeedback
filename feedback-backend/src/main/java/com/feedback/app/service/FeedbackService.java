package com.feedback.app.service;

import com.feedback.app.entities.Feedback;
import com.feedback.app.entities.UserDeviceInfo;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface FeedbackService {

    Feedback addFeedback(Feedback feedback);
    Feedback updateFeedback(Feedback feedback,Long feedbackId);
    Feedback findById(Long feedbackId);
    Feedback findBySessionId(UUID sessionId);
    List<Feedback> findAll();

    void deleteById(Long feedbackId);

    // Add method signatures for ratings and percentages
    Map<String, Object> getRatingsForQuestion(Long questionId);
    Map<String, Object> getRatingPercentagesForQuestion(Long questionId);
    Double getAverageRatingForQuestion(Long questionId);
    Map<String, Integer> getRatingCountForQuestion(Long questionId);

    Map<Integer, List<UserDeviceInfo>> getUsersByRatingForQuestion(Long questionId);

    List<UserDeviceInfo> getUsersByRatingForQuestion(Long questionId, int rating);


}
