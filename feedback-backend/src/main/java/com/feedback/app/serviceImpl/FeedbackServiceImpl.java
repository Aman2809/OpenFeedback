package com.feedback.app.serviceImpl;


import com.feedback.app.entities.Feedback;
import com.feedback.app.exceptions.ResourceNotFoundException;
import com.feedback.app.repositories.FeedbackRepository;
import com.feedback.app.service.FeedbackService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

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
        Feedback updatedFeedback=feedbackRepository.findById(feedbackId)
                .orElseThrow(()->new ResourceNotFoundException("Feedback","feedbackId",feedbackId));
        updatedFeedback.setResponses(feedback.getResponses());
        return feedbackRepository.save(updatedFeedback);
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
