package com.feedback.app.serviceImpl;


import com.feedback.app.entities.Feedback;
import com.feedback.app.entities.FeedbackResponse;
import com.feedback.app.exceptions.ResourceNotFoundException;
import com.feedback.app.repositories.FeedbackRepository;
import com.feedback.app.service.FeedbackService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback updateFeedback(Feedback feedback, Long feedbackId) {
        Feedback existingFeedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback", "feedbackId", feedbackId));

        List<FeedbackResponse> updatedResponses = feedback.getResponses();

        // Create a map of existing responses by questionId for quick lookup
        Map<Long, FeedbackResponse> existingResponsesMap = existingFeedback.getResponses().stream()
                .collect(Collectors.toMap(r -> r.getQuestion().getQuestionId(), r -> r));

        // Update or add new responses
        for (FeedbackResponse newResponse : updatedResponses) {
            FeedbackResponse existingResponse = existingResponsesMap.get(newResponse.getQuestion().getQuestionId());
            if (existingResponse != null) {
                // Update existing response
                existingResponse.setEmojiValue(newResponse.getEmojiValue());
            } else {
                // Add new response
                newResponse.setFeedback(existingFeedback); // Set the back-reference if needed
                existingFeedback.getResponses().add(newResponse);
            }
        }

        // Remove old responses that are not in the updated list
        existingFeedback.getResponses().removeIf(r -> !updatedResponses.stream()
                .anyMatch(newResponse -> newResponse.getQuestion().getQuestionId().equals(r.getQuestion().getQuestionId())));

        return feedbackRepository.save(existingFeedback);
    }


    @Override
    public Feedback findById(Long feedbackId) {
        return feedbackRepository.findById(feedbackId)
                .orElseThrow(()->new ResourceNotFoundException("Feedback","feedbackId",feedbackId));
    }

    @Override
    public Feedback findBySessionId(UUID sessionId) {
        return feedbackRepository.findBySessionId(sessionId);
    }

    @Override
    public List<Feedback> findAll() {
        return feedbackRepository.findAll();
    }

    @Override
    public void deleteById(Long feedbackId) {
        Feedback deletedFeedback =feedbackRepository.findById(feedbackId)
                .orElseThrow(()->new ResourceNotFoundException("Feedback","feedbackId",feedbackId));
        feedbackRepository.delete(deletedFeedback);
    }
}
