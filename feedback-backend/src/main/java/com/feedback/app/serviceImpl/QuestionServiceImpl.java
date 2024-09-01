package com.feedback.app.serviceImpl;

import com.feedback.app.entities.Question;
import com.feedback.app.exceptions.ResourceNotFoundException;
import com.feedback.app.repositories.QuestionRepository;
import com.feedback.app.service.QuestionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public Question saveQuestion(Question question) {
        question.setActive(true);    // New questions are active by default
       return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question,Long questionId) {
        Question updatedQuestion = questionRepository.findById(questionId)
                .orElseThrow(()->new ResourceNotFoundException("Question", "questionId", questionId));
        updatedQuestion.setQuestionText(question.getQuestionText());
        return questionRepository.save(updatedQuestion);
    }

    @Override
    public Question getQuestionById(Long questionId) {
        Question idQuestion= questionRepository.findById(questionId)
                .orElseThrow(()->new ResourceNotFoundException("Question", "questionId", questionId));
        return idQuestion;
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public void deleteQuestion(Long questionId) {
         Question deleteQuestion=questionRepository.findById(questionId)
                 .orElseThrow(()->new ResourceNotFoundException("Question", "questionId", questionId));
         questionRepository.delete(deleteQuestion);

    }

    // Fetch only active questions
    @Override
    public List<Question> getActiveQuestions() {
        return questionRepository.findByIsActiveTrue();
    }

    // Toggle isActive field
    @Override
    public Question toggleQuestionActive(Long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "questionId", questionId));
        question.setActive(!question.isActive());  // Toggle active status
        return questionRepository.save(question);
    }
}
