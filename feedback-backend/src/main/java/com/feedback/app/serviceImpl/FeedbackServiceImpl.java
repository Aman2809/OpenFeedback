package com.feedback.app.serviceImpl;


import com.feedback.app.entities.Feedback;
import com.feedback.app.entities.FeedbackResponse;
import com.feedback.app.entities.Question;
import com.feedback.app.exceptions.ResourceNotFoundException;
import com.feedback.app.repositories.FeedbackRepository;
import com.feedback.app.repositories.FeedbackResponseRepository;
import com.feedback.app.repositories.QuestionRepository;
import com.feedback.app.service.FeedbackService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackResponseRepository feedbackResponseRepository;
    private final FeedbackRepository feedbackRepository;
    private final QuestionRepository questionRepository;

    public FeedbackServiceImpl(FeedbackResponseRepository feedbackResponseRepository, FeedbackRepository feedbackRepository, QuestionRepository questionRepository) {
        this.feedbackResponseRepository = feedbackResponseRepository;
        this.feedbackRepository = feedbackRepository;
        this.questionRepository = questionRepository;

    }

//    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
//        this.feedbackRepository = feedbackRepository;
//    }

    @Override
    public Feedback addFeedback(Feedback feedback) {
        // For each response, fetch the full Question entity
        for (FeedbackResponse response : feedback.getResponses()) {
            Long questionId = response.getQuestion().getQuestionId();
            Question fullQuestion = questionRepository.findById(questionId)
                    .orElseThrow(() -> new ResourceNotFoundException("Question", "questionId", questionId));

            // Set the full Question object in the response
            response.setQuestion(fullQuestion);
        }
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
    public Map<String, Object> getRatingsForQuestion(Long questionId) {
        List<FeedbackResponse> responses = feedbackResponseRepository.findByQuestionId(questionId);

        // Map to store count of each rating
        Map<Integer, Long> ratingsCount = new HashMap<>();
        long totalRatings = 0;

        // Calculate ratings count
        for (FeedbackResponse response : responses) {
            int emojiValue = response.getEmojiValue();
            ratingsCount.put(emojiValue, ratingsCount.getOrDefault(emojiValue, 0L) + 1);
            totalRatings++; // Increment total count
        }

        // Return both the ratings count and the total number of ratings
        Map<String, Object> result = new HashMap<>();
        result.put("ratings", ratingsCount);
        result.put("total", totalRatings);

        return result;
    }

    @Override
    public Map<String, Object> getRatingPercentagesForQuestion(Long questionId) {
        List<FeedbackResponse> responses = feedbackResponseRepository.findByQuestionId(questionId);

        // Map to store count of each rating
        Map<Integer, Long> ratingsCount = new HashMap<>();
        long totalRatings = 0;

        // Calculate ratings count
        for (FeedbackResponse response : responses) {
            int emojiValue = response.getEmojiValue();
            ratingsCount.put(emojiValue, ratingsCount.getOrDefault(emojiValue, 0L) + 1);
            totalRatings++;
        }

        // Calculate percentages
        Map<Integer, Double> ratingPercentages = new HashMap<>();
        for (Map.Entry<Integer, Long> entry : ratingsCount.entrySet()) {
            ratingPercentages.put(entry.getKey(), (entry.getValue() * 100.0) / totalRatings);
        }

        // Return both the percentages and the total number of ratings
        Map<String, Object> result = new HashMap<>();
        result.put("percentages", ratingPercentages);
        result.put("total", totalRatings);

        return result;
    }


    @Override
    public Double getAverageRatingForQuestion(Long questionId) {
        List<FeedbackResponse> responses = feedbackResponseRepository.findByQuestionId(questionId);
        if (responses.isEmpty()) {
            return 0.0; // Return 0 if no responses are found
        }

        double total = 0;
        for (FeedbackResponse response : responses) {
            total += response.getEmojiValue(); // Assuming emojiValue represents the rating
        }

        return total / responses.size(); // Calculate the average
    }


    @Override
    public Map<String, Integer> getRatingCountForQuestion(Long questionId) {
        List<FeedbackResponse> responses = feedbackResponseRepository.findByQuestionId(questionId);

        Map<String, Integer> ratingCount = new HashMap<>();
        ratingCount.put("5", 0);
        ratingCount.put("4", 0);
        ratingCount.put("3", 0);
        ratingCount.put("2", 0);
        ratingCount.put("1", 0);

        for (FeedbackResponse response : responses) {
            int rating = response.getEmojiValue(); // Assuming emojiValue represents the rating
            if (rating >= 1 && rating <= 5) {
                ratingCount.put(String.valueOf(rating), ratingCount.get(String.valueOf(rating)) + 1);
            }
        }

        return ratingCount;
    }





    @Override
    public void deleteById(Long feedbackId) {
        Feedback deletedFeedback =feedbackRepository.findById(feedbackId)
                .orElseThrow(()->new ResourceNotFoundException("Feedback","feedbackId",feedbackId));
        feedbackRepository.delete(deletedFeedback);
    }
}
