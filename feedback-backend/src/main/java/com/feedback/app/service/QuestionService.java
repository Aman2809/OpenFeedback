package com.feedback.app.service;

import com.feedback.app.entities.Question;

import java.util.List;

public interface QuestionService {

    Question saveQuestion(Question question);
    Question updateQuestion(Question question,Long questionId);

    Question getQuestionById(Long questionId);
    List<Question> getAllQuestions();

    void deleteQuestion(Long questionId);


    // New method to fetch active questions
    List<Question> getActiveQuestions();

    // New method to toggle isActive status
    Question toggleQuestionActive(Long questionId);

}
