package com.feedback.app.serviceImpl;

import com.feedback.app.entities.FeedbackResponse;
import com.feedback.app.repositories.FeedbackResponseRepository;
import com.feedback.app.service.FeedbackResponseService;
import org.springframework.stereotype.Service;

@Service
public class FeedbackResponseServiceImpl implements FeedbackResponseService {

    private final FeedbackResponseRepository feedbackResponseRepository;

    public FeedbackResponseServiceImpl(FeedbackResponseRepository feedbackResponseRepository) {
        this.feedbackResponseRepository = feedbackResponseRepository;
    }

    @Override
    public FeedbackResponse saveFeedbackResponse(FeedbackResponse feedbackResponse) {
        return feedbackResponseRepository.save(feedbackResponse);
    }
}

